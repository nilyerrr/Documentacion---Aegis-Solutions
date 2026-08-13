# Medidas de Seguridad para los Equipos de Red (Aegis Solutions)

Este documento presenta el análisis técnico exhaustivo de los protocolos de seguridad implementados en la infraestructura multi-sucursal (**Santo Domingo, Santiago y La Romana**), junto con el conjunto de recomendaciones de endurecimiento (*hardening*) y los scripts de configuración listos para producción para cada equipo.

---

## 1. Auditoría y Matriz de Brechas Actuales por Sucursal

A continuación se resume la evaluación de los scripts existentes frente a los **6 ejes fundamentales de seguridad en redes conmutadas y enrutadas**:

| Eje de Seguridad | Santo Domingo (R-SD, SWM-1/2, SW-10/11/12) | Santiago (R-Santiago, SW-1, SW-2) | La Romana (R-Romana, SW-3, SW-9) |
| :--- | :--- | :--- | :--- |
| **1. Control de Acceso** | **Parcial**: SSH v2, contraseñas encriptadas, banners y timeouts VTY activos. *Falta ACL de administración en VTY y apagado de puertos desocupados en VLAN Blackhole.* | **Deficiente en Switches**: `SW-1` y `SW-2` carecen de encriptación de claves, banners y timeouts. VTY sin ACL de restricción de IP de gestión. | **Parcial**: SSH v2 y contraseñas seguras activas. *Falta ACL de administración VTY y aislamiento de puertos no usados.* |
| **2. Seguridad de Puertos** | **Bueno en Acceso**: `SW-10`, `SW-11` y `SW-12` tienen `port-security` con MAC sticky (máx. 2 MACs) y violación `restrict`. *Falta `errdisable recovery`.* | **Crítico (Ausente)**: `SW-2` tiene puertos de servidor y PCs **sin Port Security**. Vulnerable a MAC Flooding y suplantación de MAC. | **Bueno en Acceso**: `SW-9` incluye `port-security` sticky en puertos finales. *Falta `errdisable recovery` y modo `shutdown`.* |
| **3. Ataques de VLAN** | **Aceptable**: Usa VLAN 99 como nativa y `switchport nonegotiate`. *VLAN 99 está en uso en la red en lugar de ser una VLAN nativa muerta (ej. VLAN 999).* | **Crítico (Ausente en Switches)**: `SW-1` y `SW-2` no tienen VLAN nativa explícita en troncales (usan VLAN 1) ni `switchport nonegotiate`. Vulnerables a VLAN Hopping y DTP Spoofing. | **Aceptable**: VLAN 99 nativa en troncales y DTP desactivado con `switchport nonegotiate`. *Falta tagging global de VLAN nativa.* |
| **4. Ataques de DHCP** | **Inactivo por Compatibilidad**: Scripts contienen `no ip dhcp snooping` para compatibilidad en emuladores. Vulnerable a Rogue DHCP y Starvation en entornos reales. | **Ausente**: No se ha habilitado DHCP Snooping ni IP Source Guard en `SW-2` (donde reside el servidor DHCP Linux). | **Ausente**: Sin protección de DHCP Snooping ni Rate Limiting contra ataques de denegación de servicio por DHCP Starvation. |
| **5. Ataques de ARP** | **Inactivo**: Scripts de acceso incluyen `no ip arp inspection vlan`. Vulnerable a ARP Poisoning y Man-in-the-Middle (MITM). | **Ausente**: No existe inspección dinámica de ARP (DAI) en los switches de la sucursal. | **Ausente**: Sin configuración de Dynamic ARP Inspection (DAI) en `SW-3` ni `SW-9`. |
| **6. Ataques de STP** | **Bueno en Acceso**: `spanning-tree portfast edge` y `bpduguard enable` en accesos. Prioridades Root configuradas. *Falta Root Guard en uplinks.* | **Crítico**: `SW-1` y `SW-2` no definen modo Rapid-PVST ni prioridades. Accesos en `SW-2` **no tienen PortFast ni BPDU Guard**. | **Bueno**: Rapid-PVST y prioridades en `SW-3`. BPDU Guard y PortFast en `SW-9`. *Falta Root Guard hacia el Router.* |

---

## 2. Justificación Técnica de las Medidas a Implementar (El Porqué)

### 2.1. Control de Acceso
- **Filtro de IPs de Gestión en Líneas VTY (`access-class`)**: 
  - *Por qué*: Limita el acceso por SSH a los equipos únicamente desde las subredes autorizadas del Departamento de Soporte/TI y Administración. Evita ataques de fuerza bruta o escaneo desde VLANs de usuarios o invitados.
- **Aislamiento de Puertos No Utilizados (VLAN 999 - UNUSED_BLACKHOLE + `shutdown`)**:
  - *Por qué*: Si un puerto físico de un switch no está en uso y permanece activo en la VLAN por defecto (VLAN 1), un atacante en una toma de pared puede conectarse directamente a la red interna. Moverlos a una VLAN "agujero negro" sin interfaz SVI ni ruteo y apagarlos desactiva este vector de ataque físico.
- **Desactivación de Servicios Inseguros (HTTP/CDP en interfaces no confiables)**:
  - *Por qué*: Desactivar `ip http server` y `cdp enable` en puertos expuestos evita la fuga de información sobre el modelo e IOS de los equipos.

### 2.2. Seguridad de Puertos (Port Security)
- **Implementación de `switchport port-security` con MAC Sticky**:
  - *Por qué*: Asocia dinámicamente la dirección MAC del primer o segundo dispositivo que se conecta al puerto y la guarda en la configuración. Si se intenta conectar una laptop no autorizada o un mini-switch pirata, el puerto bloquea el tráfico.
- **Recuperación Automática de Puertos (`errdisable recovery cause psecure-violation`)**:
  - *Por qué*: Permite que un puerto penalizado por violación de seguridad se restablezca automáticamente tras un intervalo definido (ej. 300 segundos) si la causa desaparece, reduciendo la carga operativa del equipo de soporte.

### 2.3. Protección contra Ataques de VLAN (VLAN Hopping & Double Tagging)
- **VLAN Nativa Muerta (VLAN 999 - UNUSED_NATIVE)**:
  - *Por qué*: En los enlaces troncales 802.1Q, las tramas de la VLAN nativa se envían sin etiqueta. Los atacantes pueden enviar tramas con doble etiqueta (*Double Tagging*) aprovechando que la VLAN nativa está presente en la interfaz de acceso del atacante y en el troncal. Asignar una VLAN sin usuarios ni interfaces SVI como nativa invalida el ataque.
- **Desactivación de DTP (`switchport nonegotiate`)**:
  - *Por qué*: El protocolo Dynamic Trunking Protocol (DTP) de Cisco intenta negociar troncales automáticos. Un atacante con herramientas como Yersinia puede emular tramas DTP para convertir un puerto de acceso en un enlace troncal (*DTP Spoofing*) y acceder a todas las VLANs.
- **Etiquetado Obligatorio de VLAN Nativa (`vlan dot1q tag native`)**:
  - *Por qué*: Fuerza a que todas las tramas, incluidas las de la VLAN nativa, lleven cabecera 802.1Q, bloqueando por completo la técnica de Double Tagging.

### 2.4. Protección contra Ataques de DHCP (DHCP Snooping & IP Source Guard)
- **DHCP Snooping (`ip dhcp snooping`)**:
  - *Por qué*: El switch analiza el tráfico DHCP y clasifica las interfaces en **confiables** (*trusted*) y **no confiables** (*untrusted*). Solo se permiten respuestas DHCP Server desde puertos confiables (donde está el router o servidor oficial). Esto evita que un atacante monte un **Servidor DHCP Falso (Rogue DHCP)** para hacer man-in-the-middle cambiando el Gateway y DNS de los usuarios.
- **Limitación de Tasa (`ip dhcp snooping limit rate 15`)**:
  - *Por qué*: Mitiga ataques de **DHCP Starvation**, donde un atacante genera miles de peticiones DHCP con MACs falsas para agotar todas las IPs disponibles del servidor DHCP legítimo.
- **IP Source Guard (`ip verify source`)**:
  - *Por qué*: Utiliza la tabla de DHCP Snooping para verificar que la dirección IP de origen de los paquetes recibidos en un puerto coincida con la IP asignada por DHCP a esa dirección MAC. Evita el IP Spoofing en la capa de acceso.

> [!NOTE]
> **Nota de Compatibilidad**: En laboratorios simulados (IOL/PNETLab), si el cliente no recibe IP debido a la opción 82, se incluye la directiva `no ip dhcp snooping information option` en los switches de acceso.

### 2.5. Protección contra Ataques de ARP (Dynamic ARP Inspection - DAI)
- **Dynamic ARP Inspection (`ip arp inspection vlan ...`)**:
  - *Por qué*: Los ataques de envenenamiento ARP (*ARP Poisoning / ARP Spoofing*) permiten a un atacante asociar su dirección MAC con la IP del Gateway por defecto mediante respuestas ARP falsificadas gratuitas (*Gratuitous ARP*). DAI intercepta y valida todas las tramas ARP entrantes en puertos no confiables cruzándolas contra la base de datos de vinculación de DHCP Snooping. Si el par IP-MAC es falso, la trama ARP es descartada.

### 2.6. Protección contra Ataques de STP (Spanning Tree Security)
- **PortFast Edge (`spanning-tree portfast edge`)**:
  - *Por qué*: Pasa los puertos de acceso directamente al estado de reenvío (*Forwarding*) sin esperar el tiempo de convergencia de STP (30-50 segs).
- **BPDU Guard (`spanning-tree bpduguard enable` o global)**:
  - *Por qué*: Si un usuario conecta un switch no autorizado o ejecuta un software de ataque que envía BPDUs en un puerto final, BPDU Guard coloca el puerto inmediatamente en estado `err-disabled`, protegiendo la topología.
- **Root Guard (`spanning-tree guard root`)**:
  - *Por qué*: Se configura en los puertos troncales descendentes (hacia switches secundarios o de acceso). Garantiza que ningún switch externo o secundario con una prioridad STP inferior pueda autonombrarse como Root Bridge de la red.
- **Loop Guard (`spanning-tree loopguard default`)**:
  - *Por qué*: Evita que puertos troncales o EtherChannels pasen erróneamente de estado de bloqueo a reenvío por fallas unidireccionales de fibra/cable.

---

## 3. Scripts de Configuración de Seguridad por Sucursal y Equipo

---

### SUCURSAL 1: SANTO DOMINGO (SEDE CENTRAL / HUB)

#### 1. Router Principal `R-SD`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - R-SD (SANTO DOMINGO)
! ============================================================
enable
configure terminal

! --- 1. Control de Acceso: ACL de Gestión para VTY ---
ip access-list standard ACL-ADMIN-VTY
 remark Permitir solo subredes de Soporte Técnico y Administración
 permit 10.0.17.0 0.0.0.31
 permit 10.0.16.192 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in
 transport input ssh
 exec-timeout 5 0
 login local

line con 0
 exec-timeout 5 0
 logging synchronous

! --- 2. Protecciones Adicionales de Capa 3 ---
no ip http server
no ip http secure-server
no ip source-route
ip ssh authentication-retries 2
ip ssh time-out 60

end
write memory
```

#### 2. Multicapa Principal `SWM-1`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SWM-1 (CORE SANTO DOMINGO)
! ============================================================
enable
configure terminal

! --- 1. Definición de VLAN Blackhole / Nativa Muerta ---
vlan 999
 name UNUSED_BLACKHOLE

! Tagging global de VLAN nativa
vlan dot1q tag native

! --- 2. Seguridad en Troncales y EtherChannel ---
interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate

interface range Ethernet0/1 - 3
 switchport trunk native vlan 999
 switchport nonegotiate

interface range Ethernet1/0 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 ! Habilitar Root Guard hacia los switches de acceso SW-10, SW-11, SW-12
 spanning-tree guard root

! --- 3. Habilitación de DHCP Snooping y DAI (Servidor en R-SD) ---
ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40,50,60,70
no ip dhcp snooping information option

! Marcar enlace hacia R-SD (e0/0) y troncales como confiables
interface Ethernet0/0
 ip dhcp snooping trust
 ip arp inspection trust

interface Port-channel1
 ip dhcp snooping trust
 ip arp inspection trust

interface range Ethernet1/0 - 2
 ip dhcp snooping trust
 ip arp inspection trust

! Habilitar Dynamic ARP Inspection
ip arp inspection vlan 10,20,30,40,50,60,70
ip arp inspection validate src-mac dst-mac ip

! --- 4. Loop Guard Global ---
spanning-tree loopguard default

! --- 5. Control de Acceso a VTY ---
ip access-list standard ACL-ADMIN-VTY
 permit 10.0.17.0 0.0.0.31
 permit 10.0.16.192 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in
 exec-timeout 5 0

end
write memory
```

#### 3. Multicapa Secundario `SWM-2`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SWM-2 (CORE BACKUP SANTO DOMINGO)
! ============================================================
enable
configure terminal

vlan 999
 name UNUSED_BLACKHOLE

vlan dot1q tag native

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate

interface range Ethernet0/1 - 3
 switchport trunk native vlan 999
 switchport nonegotiate

interface range Ethernet1/0 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

! DHCP Snooping y DAI
ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40,50,60,70
no ip dhcp snooping information option

interface Ethernet0/0
 ip dhcp snooping trust
 ip arp inspection trust

interface Port-channel1
 ip dhcp snooping trust
 ip arp inspection trust

interface range Ethernet1/0 - 2
 ip dhcp snooping trust
 ip arp inspection trust

ip arp inspection vlan 10,20,30,40,50,60,70
ip arp inspection validate src-mac dst-mac ip

spanning-tree loopguard default

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.17.0 0.0.0.31
 permit 10.0.16.192 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in
 exec-timeout 5 0

end
write memory
```

#### 4. Switch de Acceso `SW-10`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SW-10 (ACCESO SANTO DOMINGO)
! ============================================================
enable
configure terminal

vlan 999
 name UNUSED_BLACKHOLE

! Configurar autorrecuperación de violaciones de port-security
errdisable recovery cause psecure-violation
errdisable recovery interval 300

! Trunk Hardening hacia SWM-1 y SWM-2
interface range Ethernet0/0 - 1
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

! Activar DHCP Snooping y Dynamic ARP Inspection
ip dhcp snooping
ip dhcp snooping vlan 10,20
no ip dhcp snooping information option

ip arp inspection vlan 10,20
ip arp inspection validate src-mac dst-mac ip

! Hardening de Puertos de Acceso
interface range Ethernet0/2 - 3
 switchport mode access
 switchport nonegotiate
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 ip dhcp snooping limit rate 15
 ip verify source
 spanning-tree portfast edge
 spanning-tree bpduguard enable

! Aislamiento de Puertos Libres/No Usados
interface range Ethernet1/0 - 3, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

! ACL VTY
ip access-list standard ACL-ADMIN-VTY
 permit 10.0.17.0 0.0.0.31
 permit 10.0.16.192 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in

end
write memory
```

#### 5. Switch de Acceso `SW-11`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SW-11 (ACCESO SANTO DOMINGO)
! ============================================================
enable
configure terminal

vlan 999
 name UNUSED_BLACKHOLE

errdisable recovery cause psecure-violation
errdisable recovery interval 300

interface range Ethernet0/0 - 1
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

ip dhcp snooping
ip dhcp snooping vlan 30,40
no ip dhcp snooping information option

ip arp inspection vlan 30,40
ip arp inspection validate src-mac dst-mac ip

interface range Ethernet0/2 - 3
 switchport mode access
 switchport nonegotiate
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 ip dhcp snooping limit rate 15
 ip verify source
 spanning-tree portfast edge
 spanning-tree bpduguard enable

interface range Ethernet1/0 - 3, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.17.0 0.0.0.31
 permit 10.0.16.192 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in

end
write memory
```

#### 6. Switch de Acceso `SW-12`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SW-12 (ACCESO SANTO DOMINGO)
! ============================================================
enable
configure terminal

vlan 999
 name UNUSED_BLACKHOLE

errdisable recovery cause psecure-violation
errdisable recovery interval 300

interface range Ethernet0/0 - 1
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

ip dhcp snooping
ip dhcp snooping vlan 50,60,70
no ip dhcp snooping information option

ip arp inspection vlan 50,60,70
ip arp inspection validate src-mac dst-mac ip

interface range Ethernet0/2 - 3, Ethernet1/0
 switchport mode access
 switchport nonegotiate
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 ip dhcp snooping limit rate 15
 ip verify source
 spanning-tree portfast edge
 spanning-tree bpduguard enable

interface range Ethernet1/1 - 3, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.17.0 0.0.0.31
 permit 10.0.16.192 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in

end
write memory
```

---

### SUCURSAL 2: SANTIAGO (SEDE SPOKE + SERVIDORES)

#### 1. Router Spoke `R-Santiago`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - R-SANTIAGO
! ============================================================
enable
configure terminal

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.12.0 0.0.0.255  ! Subred Administración Santiago
 permit 10.0.17.0 0.0.0.31   ! Subred Soporte SD (VPN)
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in
 transport input ssh
 exec-timeout 5 0
 login local

line con 0
 exec-timeout 5 0
 logging synchronous

no ip http server
no ip http secure-server

end
write memory
```

#### 2. Switch Distribución `SW-1`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD COMPLETO - SW-1 (SANTIAGO)
! ============================================================
enable
configure terminal

service password-encryption
service timestamps debug datetime msec
service timestamps log datetime msec
ip domain-name aegis.com.do
ip ssh version 2

vlan 999
 name UNUSED_BLACKHOLE

vlan dot1q tag native

! Spanning Tree Optimization
spanning-tree mode rapid-pvst
spanning-tree extend system-id
spanning-tree vlan 99,110,130,140,199 priority 24576

! Enlace hacia R-Santiago (e0/0)
interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate

! EtherChannel hacia SW-2
interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

! Apagado de puertos libres
interface range Ethernet0/3, Ethernet1/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

banner motd #
*******************************************************
AEGIS SOLUTIONS - SEDE SANTIAGO (SW-1 DISTRIBUCION)
ACCESO NO AUTORIZADO ESTA ESTRICTAMENTE PROHIBIDO.
*******************************************************
#

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.12.0 0.0.0.255
 permit 10.0.17.0 0.0.0.31
 deny any log

line con 0
 exec-timeout 5 0
 logging synchronous

line vty 0 4
 access-class ACL-ADMIN-VTY in
 exec-timeout 5 0
 login local
 transport input ssh

end
write memory
```

#### 3. Switch L3 / Acceso `SW-2`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD COMPLETO - SW-2 (SANTIAGO)
! ============================================================
enable
configure terminal

service password-encryption
service timestamps debug datetime msec
service timestamps log datetime msec
ip domain-name aegis.com.do
ip ssh version 2

vlan 999
 name UNUSED_BLACKHOLE

vlan dot1q tag native

spanning-tree mode rapid-pvst
spanning-tree extend system-id
spanning-tree vlan 99,110,130,140,199 priority 28672

errdisable recovery cause psecure-violation
errdisable recovery interval 300

! EtherChannel hacia SW-1
interface range Ethernet0/0 - 1
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

! Habilitación de DHCP Snooping y DAI (Servidor en e0/2 - IP 10.0.10.2)
ip dhcp snooping
ip dhcp snooping vlan 110,130,140,199
no ip dhcp snooping information option

! Puerto del Servidor Linux (e0/2) -> Confiable para DHCP
interface Ethernet0/2
 description Server Linux (DHCP-DNS-NFS-RADIUS-FTP)
 switchport mode access
 switchport access vlan 199
 switchport nonegotiate
 switchport port-security
 switchport port-security maximum 5
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 ip dhcp snooping trust
 ip arp inspection trust
 spanning-tree portfast edge
 spanning-tree bpduguard enable

! Dynamic ARP Inspection
ip arp inspection vlan 110,130,140,199
ip arp inspection validate src-mac dst-mac ip

! Hardening de Puertos de Acceso (PCs)
interface range Ethernet0/3, Ethernet1/0 - 1, Ethernet1/3
 switchport mode access
 switchport nonegotiate
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 ip dhcp snooping limit rate 15
 ip verify source
 spanning-tree portfast edge
 spanning-tree bpduguard enable

! Apagado de Puertos No Usados
interface range Ethernet1/2, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

banner motd #
*******************************************************
AEGIS SOLUTIONS - SEDE SANTIAGO (SW-2 CORE/ACCESO)
ACCESO NO AUTORIZADO ESTA ESTRICTAMENTE PROHIBIDO.
*******************************************************
#

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.12.0 0.0.0.255
 permit 10.0.17.0 0.0.0.31
 deny any log

line con 0
 exec-timeout 5 0
 logging synchronous

line vty 0 4
 access-class ACL-ADMIN-VTY in
 exec-timeout 5 0
 login local
 transport input ssh

end
write memory
```

---

### SUCURSAL 3: LA ROMANA (SEDE SPOKE)

#### 1. Router Spoke `R-Romana`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - R-ROMANA
! ============================================================
enable
configure terminal

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.15.128 0.0.0.127 ! Subred Infraestructura Romana
 permit 10.0.17.0 0.0.0.31    ! Subred Soporte SD (VPN)
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in
 transport input ssh
 exec-timeout 5 0
 login local

line con 0
 exec-timeout 5 0
 logging synchronous

no ip http server
no ip http secure-server

end
write memory
```

#### 2. Switch Distribución `SW-3`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SW-3 (LA ROMANA)
! ============================================================
enable
configure terminal

vlan 999
 name UNUSED_BLACKHOLE

vlan dot1q tag native

! Trunk hacia el Router R-Romana (e0/0)
interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

! EtherChannel hacia SW-9
interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

! Puertos sin uso
interface range Ethernet0/3, Ethernet1/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.15.128 0.0.0.127
 permit 10.0.17.0 0.0.0.31
 deny any log

line vty 0 4
 access-class ACL-ADMIN-VTY in
 exec-timeout 5 0
 login local
 transport input ssh

end
write memory
```

#### 3. Switch de Acceso `SW-9`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SW-9 (LA ROMANA)
! ============================================================
enable
configure terminal

vlan 999
 name UNUSED_BLACKHOLE

errdisable recovery cause psecure-violation
errdisable recovery interval 300

! EtherChannel tronco hacia SW-3
interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

! DHCP Snooping y Dynamic ARP Inspection (Servidor DHCP en R-Romana)
ip dhcp snooping
ip dhcp snooping vlan 210,220,230
no ip dhcp snooping information option

ip arp inspection vlan 210,220,230
ip arp inspection validate src-mac dst-mac ip

! Puertos de Acceso Físicos
interface range Ethernet1/1 - 3
 switchport mode access
 switchport nonegotiate
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 ip dhcp snooping limit rate 15
 ip verify source
 spanning-tree portfast edge
 spanning-tree bpduguard enable

! Aislamiento de Puertos No Usados
interface range Ethernet0/0, Ethernet0/3, Ethernet1/0, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.15.128 0.0.0.127
 permit 10.0.17.0 0.0.0.31
 deny any log

line con 0
 exec-timeout 5 0
 logging synchronous

line vty 0 4
 access-class ACL-ADMIN-VTY in
 exec-timeout 5 0
 login local
 transport input ssh

end
write memory
```

---

## 4. Resumen de Verificación y Buenas Prácticas para el SOC

1. **Monitoreo de Violaciones de Puerto**:
   - Verificar puertos bloqueados por Port Security con el comando `show port-security interface <int>` y `show errdisable recovery`.
2. **Validación de la Base de Datos DHCP Snooping**:
   - Inspeccionar la tabla de asignaciones válidas IP-MAC con `show ip dhcp snooping binding`.
3. **Verificación de Tramas ARP Bloqueadas por DAI**:
   - Monitorear descartes de ARP maliciosos mediante `show ip arp inspection statistics`.
4. **Verificación del Árbol Spanning Tree y Guardias**:
   - Confirmar el estado de los puertos de acceso y troncales con `show spanning-tree summary` y `show spanning-tree detail | include Guard`.
