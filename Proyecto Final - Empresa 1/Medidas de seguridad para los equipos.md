# Medidas de Seguridad para los Equipos de Red (Aegis Solutions)

Este documento presenta el análisis técnico exhaustivo de los protocolos de seguridad implementados en la infraestructura multi-sucursal (**Santo Domingo, Santiago, La Romana y Puerto Plata**), junto con el conjunto de recomendaciones de endurecimiento (*hardening*) y los scripts de configuración listos para producción para cada equipo.

---

## 1. Auditoría y Matriz de Brechas Actuales por Sucursal

A continuación se resume la evaluación de los scripts existentes frente a los **6 ejes fundamentales de seguridad en redes conmutadas y enrutadas**:

| Eje de Seguridad | Santo Domingo (R-SD, SWM-1/2, SW-10/11/12) | Santiago (R-Santiago, SW-1, SW-2) | La Romana (R-Romana, SW-3, SW-9) | Puerto Plata (R-PuertoPlata, SW-5, SW-30, SW-31) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Control de Acceso** | **Parcial**: SSH v2, contraseñas encriptadas, banners y timeouts VTY activos. *Falta ACL de administración en VTY y apagado de puertos desocupados en VLAN Blackhole.* | **Deficiente en Switches**: `SW-1` y `SW-2` carecen de encriptación de claves, banners y timeouts. VTY sin ACL de restricción de IP de gestión. | **Parcial**: SSH v2 y contraseñas seguras activas. *Falta ACL de administración VTY y aislamiento de puertos no usados.* | **Deficiente en Switches**: `SW-5`, `sw-30` y `sw-31` carecen de encriptación de clave, banners, timeouts VTY y SSH RSA explícito en el script. VTY sin ACL. |
| **2. Seguridad de Puertos** | **Bueno en Acceso**: `SW-10`, `SW-11` y `SW-12` tienen `port-security` con MAC sticky (máx. 2 MACs) y violación `restrict`. *Falta `errdisable recovery`.* | **Crítico (Ausente)**: `SW-2` tiene puertos de servidor y PCs **sin Port Security**. Vulnerable a MAC Flooding y suplantación de MAC. | **Bueno en Acceso**: `SW-9` incluye `port-security` sticky en puertos finales. *Falta `errdisable recovery` y modo `shutdown`.* | **Crítico (Ausente)**: `sw-30` y `sw-31` no tienen Port Security en accesos (DFIR, Malware, Red Team, SOC, TH). Vulnerables a MAC Flooding. |
| **3. Ataques de VLAN** | **Aceptable**: Usa VLAN 99 como nativa y `switchport nonegotiate`. *VLAN 99 está en uso en lugar de ser una VLAN nativa muerta (ej. VLAN 999).* | **Crítico (Ausente en Switches)**: `SW-1` y `SW-2` no tienen VLAN nativa explícita en troncales (usan VLAN 1) ni `switchport nonegotiate`. Vulnerables a VLAN Hopping. | **Aceptable**: VLAN 99 nativa en troncales y DTP desactivado con `switchport nonegotiate`. *Falta tagging global de VLAN nativa.* | **Crítico (Ausente)**: `SW-5`, `sw-30` y `sw-31` usan VLAN 1 por defecto en troncales y no ejecutan `switchport nonegotiate`. Vulnerables a DTP Spoofing. |
| **4. Ataques de DHCP** | **Inactivo**: Desactivado por compatibilidad en laboratorio. Vulnerable a Rogue DHCP y Starvation en entornos reales. | **Ausente**: Sin DHCP Snooping ni IP Source Guard en `SW-2` (donde reside el servidor DHCP Linux). | **Ausente**: Sin protección de DHCP Snooping ni Rate Limiting contra ataques por DHCP Starvation. | **Ausente (Retirado)**: Retirado por falla en asignación de IP. *Se incluye diagnóstico y solución técnica del bug de Option 82 abajo.* |
| **5. Ataques de ARP** | **Inactivo**: Scripts de acceso incluyen `no ip arp inspection vlan`. Vulnerable a ARP Poisoning y MITM. | **Ausente**: No existe inspección dinámica de ARP (DAI) en los switches de la sucursal. | **Ausente**: Sin configuración de Dynamic ARP Inspection (DAI) en `SW-3` ni `SW-9`. | **Ausente**: Sin Dynamic ARP Inspection (DAI) en `SW-5`, `sw-30` ni `sw-31`. Vulnerables a ARP Spoofing/Poisoning. |
| **6. Ataques de STP** | **Bueno en Acceso**: `spanning-tree portfast edge` y `bpduguard enable` en accesos. Prioridades Root configuradas. *Falta Root Guard en uplinks.* | **Crítico**: `SW-1` y `SW-2` no definen modo Rapid-PVST ni prioridades. Accesos en `SW-2` **no tienen PortFast ni BPDU Guard**. | **Bueno**: Rapid-PVST y prioridades en `SW-3`. BPDU Guard y PortFast en `SW-9`. *Falta Root Guard hacia el Router.* | **Crítico**: `SW-5`, `sw-30` y `sw-31` no especifican Rapid-PVST, prioridades, ni PortFast / BPDU Guard en accesos. Vulnerables a ataques de BPDU. |

---

## 2. Justificación Técnica de las Medidas y Diagnóstico de DHCP Snooping

### 2.1. Diagnóstico Técnico: ¿Por qué falló el DHCP cuando se activó DHCP Snooping?
Cuando se habilita **DHCP Snooping** en switches Cisco IOS, el switch automáticamente inserta la **Opción 82 (Relay Information Option)** en las solicitudes DHCP con la dirección `giaddr = 0.0.0.0`. Por defecto, los Routers Cisco y Servidores DHCP descartan las solicitudes DHCP que contienen la Opción 82 si provienen de un switch con `giaddr = 0.0.0.0` o si la interfaz del switch no se ha marcado como confiable (*trusted*).

**Consecuencia**: Las PCs no reciben dirección IP y se quedan en APIPA (`169.254.x.x`).

**Solución Técnica Correcta para Reactivar DHCP Snooping Sin Bloquear IPs**:
1. En **todos los switches de acceso**, deshabilitar la inserción automática de la opción 82 con el comando:
   ```cisco
   no ip dhcp snooping information option
   ```
2. En el **Router DHCP / Relay**, permitir solicitudes con opción 82 no confiable con:
   ```cisco
   ip dhcp relay information trust-all
   ```
3. Marcar **TODOS los enlaces troncales y uplinks** que conectan al Router o Servidor DHCP como confiables:
   ```cisco
   interface <troncal>
    ip dhcp snooping trust
   ```
4. Aplicar `ip dhcp snooping limit rate 15` únicamente en los **puertos de acceso finales (PCs)**.

---

### 2.2. Justificación de los 6 Ejes de Seguridad

#### Control de Acceso
- **Filtro de IPs de Gestión en VTY (`access-class`)**: Limita el acceso por SSH a los equipos únicamente desde las subredes autorizadas de Soporte Técnico y Administración. Evita ataques de fuerza bruta o escaneo SSH.
- **Aislamiento de Puertos No Utilizados (VLAN 999 - UNUSED_BLACKHOLE + `shutdown`)**: Mueve puertos físicos desocupados a una VLAN "agujero negro" sin interfaz SVI ni ruteo y los apaga, eliminando vectores de acceso físico en tomas de pared.

#### Seguridad de Puertos (Port Security)
- **`switchport port-security` con MAC Sticky**: Asocia dinámicamente la dirección MAC autorizada al puerto. Si se conecta un dispositivo desconocido o un switch no autorizado, se bloquea el tráfico.
- **Recuperación Automática (`errdisable recovery cause psecure-violation`)**: Restablece automáticamente los puertos bloqueados tras 300 segundos, reduciendo la carga operativa del equipo de soporte.

#### Protección contra Ataques de VLAN (VLAN Hopping & Double Tagging)
- **VLAN Nativa Muerta (VLAN 999 - UNUSED_NATIVE)**: Invalida los ataques de *Double Tagging* al usar una VLAN desprovista de usuarios e interfaces de ruteo como nativa en los enlaces troncales.
- **Desactivación de DTP (`switchport nonegotiate`)**: Evita que un atacante emule tramas DTP para convertir un puerto de acceso en troncal (*DTP Spoofing*).
- **Etiquetado Obligatorio (`vlan dot1q tag native`)**: Fuerza el etiquetado 802.1Q en todas las tramas de la VLAN nativa.

#### Protección contra Ataques de DHCP (DHCP Snooping & IP Source Guard)
- **DHCP Snooping (`ip dhcp snooping`)**: Bloquea servidores DHCP falsos (*Rogue DHCP*) que intentan realizar Man-in-the-Middle modificando la puerta de enlace y DNS de los clientes.
- **Limitación de Tasa (`ip dhcp snooping limit rate 15`)**: Previene el agotamiento del pool de IPs por ataques de **DHCP Starvation**.
- **IP Source Guard (`ip verify source`)**: Valida que la IP de origen del cliente coincida con la asignación en la tabla de DHCP Snooping, evitando el **IP Spoofing**.

#### Protección contra Ataques de ARP (Dynamic ARP Inspection - DAI)
- **Dynamic ARP Inspection (`ip arp inspection vlan ...`)**: Intercepta y valida todas las respuestas y solicitudes ARP contra la base de datos de DHCP Snooping, bloqueando el envenenamiento ARP (*ARP Poisoning*) y Man-in-the-Middle (MITM).

#### Protección contra Ataques de STP (Spanning Tree Security)
- **PortFast Edge (`spanning-tree portfast edge`)**: Pasa puertos de acceso inmediatamente a estado de reenvío (*Forwarding*).
- **BPDU Guard (`spanning-tree bpduguard enable`)**: Coloca en `err-disabled` cualquier puerto de acceso que reciba tramas BPDU (evitando switches piratas).
- **Root Guard (`spanning-tree guard root`)**: Previene que switches secundarios u hostiles asuman el rol de Root Bridge.
- **Loop Guard (`spanning-tree loopguard default`)**: Evita bucles causados por fallas unidireccionales de enlace.

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

! Configuración Correcta de DHCP Snooping y DAI
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

#### 4. Switches de Acceso (`SW-10`, `SW-11`, `SW-12`)
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - SW-10 / SW-11 / SW-12 (SANTO DOMINGO)
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
ip dhcp snooping vlan 10,20,30,40,50,60,70
no ip dhcp snooping information option

ip arp inspection vlan 10,20,30,40,50,60,70
ip arp inspection validate src-mac dst-mac ip

! Aplicar en Interfaces de Acceso Activas (e0/2, e0/3, e1/0 según corresponda):
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

! Aislamiento de Puertos Libres
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
 permit 10.0.12.0 0.0.0.255
 permit 10.0.17.0 0.0.0.31
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

spanning-tree mode rapid-pvst
spanning-tree extend system-id
spanning-tree vlan 99,110,130,140,199 priority 24576

interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate

interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

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
 permit 10.0.15.128 0.0.0.127
 permit 10.0.17.0 0.0.0.31
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

interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

interface Port-channel1
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root

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

ip dhcp snooping
ip dhcp snooping vlan 210,220,230
no ip dhcp snooping information option

ip arp inspection vlan 210,220,230
ip arp inspection validate src-mac dst-mac ip

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

### SUCURSAL 4: PUERTO PLATA (NUEVA SEDE SPOKE - CIBERSEGURIDAD)

#### 1. Router Spoke `R-PUERTOPLATA`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD - R-PUERTOPLATA
! ============================================================
enable
configure terminal

! --- Control de Acceso: ACL de Gestión VTY ---
ip access-list standard ACL-ADMIN-VTY
 remark Permitir solo subredes de SOC/Admin Puerto Plata y Soporte SD
 permit 10.0.0.0 0.0.1.255   ! Subred SOC Puerto Plata
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
no ip source-route

end
write memory
```

#### 2. Switch Distribución `SW-5`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD COMPLETO - SW-5 (PUERTO PLATA)
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
spanning-tree vlan 310,320,330,340,350 priority 24576

! Enlace hacia el Router R-PUERTOPLATA (e0/0)
interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

! Troncales hacia sw-31 (e0/1) y sw-30 (e0/2)
interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root
 ip dhcp snooping trust
 ip arp inspection trust

! DHCP Snooping y DAI en Distribución
ip dhcp snooping
ip dhcp snooping vlan 310,320,330,340,350
no ip dhcp snooping information option

ip arp inspection vlan 310,320,330,340,350
ip arp inspection validate src-mac dst-mac ip

! Apagado de puertos desocupados
interface range Ethernet0/3, Ethernet1/0 - 3, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

banner motd #
*******************************************************
AEGIS SOLUTIONS - PUERTO PLATA (SW-5 DISTRIBUCION)
ACCESO NO AUTORIZADO ESTA ESTRICTAMENTE PROHIBIDO.
*******************************************************
#

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.0.0 0.0.1.255
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

#### 3. Switch de Acceso `sw-30` (VLAN 310 DFIR, VLAN 320 MALWARE)
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD COMPLETO - SW-30 (PUERTO PLATA)
! ============================================================
enable
configure terminal

service password-encryption
service timestamps debug datetime msec
service timestamps log datetime msec
ip domain-name aegis.com.do
ip ssh version 2
crypto key generate rsa modulus 2048

vlan 999
 name UNUSED_BLACKHOLE

vlan dot1q tag native

spanning-tree mode rapid-pvst
spanning-tree extend system-id

errdisable recovery cause psecure-violation
errdisable recovery interval 300

! Uplink hacia SW-5
interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

! DHCP Snooping y Dynamic ARP Inspection
ip dhcp snooping
ip dhcp snooping vlan 310,320
no ip dhcp snooping information option

ip arp inspection vlan 310,320
ip arp inspection validate src-mac dst-mac ip

! Puertos de Acceso Especializados (DFIR y Malware)
interface range Ethernet0/1 - 2
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
interface range Ethernet0/3, Ethernet1/0 - 3, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

banner motd #
*******************************************************
AEGIS SOLUTIONS - PUERTO PLATA (SW-30 ACCESO DFIR/MALWARE)
ACCESO NO AUTORIZADO ESTA ESTRICTAMENTE PROHIBIDO.
*******************************************************
#

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.0.0 0.0.1.255
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

#### 4. Switch de Acceso `sw-31` (VLAN 330 THREAT INTEL, VLAN 340 RED TEAM, VLAN 350 SOC)
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD COMPLETO - SW-31 (PUERTO PLATA)
! ============================================================
enable
configure terminal

service password-encryption
service timestamps debug datetime msec
service timestamps log datetime msec
ip domain-name aegis.com.do
ip ssh version 2
crypto key generate rsa modulus 2048

vlan 999
 name UNUSED_BLACKHOLE

vlan dot1q tag native

spanning-tree mode rapid-pvst
spanning-tree extend system-id

errdisable recovery cause psecure-violation
errdisable recovery interval 300

! Uplink hacia SW-5
interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

! DHCP Snooping y Dynamic ARP Inspection
ip dhcp snooping
ip dhcp snooping vlan 330,340,350
no ip dhcp snooping information option

ip arp inspection vlan 330,340,350
ip arp inspection validate src-mac dst-mac ip

! Puertos de Acceso Especializados (TH, Red Team, SOC)
interface range Ethernet0/1 - 3
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
interface range Ethernet1/0 - 3, Ethernet2/0 - 3, Ethernet3/0 - 3
 switchport mode access
 switchport access vlan 999
 shutdown

banner motd #
*******************************************************
AEGIS SOLUTIONS - PUERTO PLATA (SW-31 ACCESO INTEL/REDTEAM/SOC)
ACCESO NO AUTORIZADO ESTA ESTRICTAMENTE PROHIBIDO.
*******************************************************
#

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.0.0 0.0.1.255
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
   - Verificar puertos bloqueados por Port Security con `show port-security interface <int>` y `show errdisable recovery`.
2. **Validación de la Base de Datos DHCP Snooping**:
   - Inspeccionar la tabla de asignaciones válidas IP-MAC con `show ip dhcp snooping binding`.
3. **Verificación de Tramas ARP Bloqueadas por DAI**:
   - Monitorear descartes de ARP maliciosos mediante `show ip arp inspection statistics`.
4. **Verificación del Árbol Spanning Tree y Guardias**:
   - Confirmar el estado de los puertos de acceso y troncales con `show spanning-tree summary` y `show spanning-tree detail | include Guard`.
