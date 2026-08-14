# Medidas de Seguridad para los Equipos de Red (Aegis Solutions)

Este documento presenta el análisis técnico exhaustivo de los protocolos de seguridad implementados en la infraestructura multi-sucursal (**Santo Domingo, Santiago, La Romana y Puerto Plata**), junto con el conjunto de recomendaciones de endurecimiento (*hardening*), la solución al diagnóstico de conectividad VPN/DHCP y los scripts de configuración listos para producción para cada equipo.

---

## 1. Auditoría y Matriz de Brechas Actuales por Sucursal

A continuación se resume la evaluación de los scripts existentes frente a los **6 ejes fundamentales de seguridad en redes conmutadas y enrutadas**:

| Eje de Seguridad            | Santo Domingo (R-SD, SWM-1/2, SW-10/11/12)                                                                                                                             | Santiago (R-Santiago, SW-1, SW-2)                                                                                                                                      | La Romana (R-Romana, SW-3, SW-9)                                                                                                  | Puerto Plata (R-PuertoPlata, SW-5, SW-30, SW-31)                                                                                                             |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Control de Acceso**    | **Parcial**: SSH v2, contraseñas encriptadas, banners y timeouts VTY activos. *Falta ACL de administración en VTY y apagado de puertos desocupados en VLAN Blackhole.* | **Deficiente en Switches**: `SW-1` y `SW-2` carecen de encriptación de claves, banners y timeouts. VTY sin ACL de restricción de IP de gestión.                        | **Parcial**: SSH v2 y contraseñas seguras activas. *Falta ACL de administración VTY y aislamiento de puertos no usados.*          | **Deficiente en Switches**: `SW-5`, `sw-30` y `sw-31` carecen de encriptación de clave, banners, timeouts VTY y SSH RSA explícito en el script. VTY sin ACL. |
| **2. Seguridad de Puertos** | **Bueno en Acceso**: `SW-10`, `SW-11` y `SW-12` tienen `port-security` con MAC sticky (máx. 2 MACs) y violación `restrict`. *Falta `errdisable recovery`.*             | **Crítico (Ausente)**: `SW-2` tiene puertos de servidor y PCs **sin Port Security**. Vulnerable a MAC Flooding y suplantación de MAC.                                  | **Bueno en Acceso**: `SW-9` incluye `port-security` sticky en puertos finales. *Falta `errdisable recovery` y modo `shutdown`.*   | **Crítico (Ausente)**: `sw-30` y `sw-31` no tienen Port Security en accesos (DFIR, Malware, Red Team, SOC, TH). Vulnerables a MAC Flooding.                  |
| **3. Ataques de VLAN**      | **Aceptable**: Usa VLAN 99 como nativa y `switchport nonegotiate`. *VLAN 99 está en uso en lugar de ser una VLAN nativa muerta (ej. VLAN 999).*                        | **Crítico (Ausente en Switches)**: `SW-1` y `SW-2` no tienen VLAN nativa explícita en troncales (usan VLAN 1) ni `switchport nonegotiate`. Vulnerables a VLAN Hopping. | **Aceptable**: VLAN 99 nativa en troncales y DTP desactivado con `switchport nonegotiate`. *Falta tagging global de VLAN nativa.* | **Crítico (Ausente)**: `SW-5`, `sw-30` y `sw-31` usan VLAN 1 por defecto en troncales y no ejecutan `switchport nonegotiate`. Vulnerables a DTP Spoofing.    |
| **4. Ataques de DHCP**      | **Inactivo**: Desactivado por compatibilidad en laboratorio. Vulnerable a Rogue DHCP y Starvation en entornos reales.                                                  | **Ausente**: Sin DHCP Snooping ni IP Source Guard en `SW-2` (donde reside el servidor DHCP Linux).                                                                     | **Ausente**: Sin protección de DHCP Snooping ni Rate Limiting contra ataques por DHCP Starvation.                                 | **Ausente**: Retirado por falla en asignación de IP. *Se incluye diagnóstico y solución técnica del bug de Option 82 abajo.*                                 |
| **5. Ataques de ARP**       | **Inactivo**: Scripts de acceso incluyen `no ip arp inspection vlan`. Vulnerable a ARP Poisoning y MITM.                                                               | **Ausente**: No existe inspección dinámica de ARP (DAI) en los switches de la sucursal.                                                                                | **Ausente**: Sin configuración de Dynamic ARP Inspection (DAI) en `SW-3` ni `SW-9`.                                               | **Ausente**: Sin Dynamic ARP Inspection (DAI) en `SW-5`, `sw-30` ni `sw-31`. Vulnerables a ARP Spoofing/Poisoning.                                           |
| **6. Ataques de STP**       | **Bueno en Acceso**: `spanning-tree portfast edge` y `bpduguard enable` en accesos. Prioridades Root configuradas. *Falta Root Guard en uplinks.*                      | **Crítico**: `SW-1` y `SW-2` no definen modo Rapid-PVST ni prioridades. Accesos en `SW-2` **no tienen PortFast ni BPDU Guard**.                                        | **Bueno**: Rapid-PVST y prioridades en `SW-3`. BPDU Guard y PortFast en `SW-9`. *Falta Root Guard hacia el Router.*               | **Crítico**: `SW-5`, `sw-30` y `sw-31` no especifican Rapid-PVST, prioridades, ni PortFast / BPDU Guard en accesos. Vulnerables a ataques de BPDU.           |

---

## 2. Diagnósticos Técnicos de Conectividad y Soluciones de Red

### 2.1. Diagnóstico de los Mensajes en Consola (`OSPF-4-ERRRCV` y `CDP-4-DUPLEX_MISMATCH`)

#### A. Mensaje: `%OSPF-4-ERRRCV: Received invalid packet: mismatched area ID from backbone area from 10.1.100.1, Tunnel1`
- **Causa**: Al declarar redes OSPF con máscaras wildcard generales (`network 10.0.0.0 0.255.255.255 area 40`), la interfaz `Tunnel1` (`10.1.100.4`) terminaba dentro del Área 40 en el router de Puerto Plata, mientras que el HUB de Santo Domingo (`10.1.100.1`) enviaba los paquetes Hello de OSPF pertenencientes a la **Area 0 (Backbone)**.
- **Solución**: Declarar explícitamente `ip ospf 1 area 0` directamente bajo la interfaz `Tunnel1` en todos los routers de las 4 sedes. Esto sobreescribe cualquier wildcard mask y garantiza que el túnel VPN pertenezca permanentemente al Área 0.

#### B. Mensaje: `%CDP-4-DUPLEX_MISMATCH: duplex mismatch discovered on Ethernet0/1 (not full duplex), with SW-5 Ethernet0/0 (full duplex)`
- **Causa**: La interfaz `Ethernet0/1` del router `R-PUERTOPLATA` estaba configurada en modo `duplex auto` (half-duplex negociado), mientras que la interfaz `Ethernet0/0` del switch `SW-5` estaba configurada en `duplex full`.
- **Solución**: Configurar `duplex full` en `Ethernet0/1` de `R-PUERTOPLATA` para igualar la velocidad y la transmisión bidireccional completa.

---

### 2.2. Diagnóstico Técnico: ¿Por qué fallaba el DHCP con Snooping y cómo resolverlo?
Cuando se habilita **DHCP Snooping** en switches Cisco IOS, el switch automáticamente inserta la **Opción 82 (Relay Information Option)** en las solicitudes DHCP con la dirección `giaddr = 0.0.0.0`. Por defecto, los Routers Cisco y Servidores DHCP descartan las solicitudes DHCP que contienen la Opción 82 si provienen de un switch con `giaddr = 0.0.0.0` o si la interfaz del switch no se ha marcado como confiable (*trusted*).

**Solución Técnica Correcta para Reactivar DHCP Snooping Sin Bloquear IPs**:
1. En **todos los switches de acceso**, deshabilitar la inserción automática de la opción 82:
   ```cisco
   no ip dhcp snooping information option
   ```
2. En el **Router DHCP / Relay**, permitir solicitudes con opción 82 no confiable:
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

## 3. Scripts de Configuración de Seguridad por Sucursal y Equipo

---

### SUCURSAL 1: SANTO DOMINGO (SEDE CENTRAL / HUB)

#### 1. Router Principal `R-SD`
```cisco
! ============================================================
! ENDURECIMIENTO DE SEGURIDAD Y DMVPN IPSEC - R-SD (SANTO DOMINGO)
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

crypto isakmp policy 10
 encr aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 3600
crypto isakmp key AEGIS-2026-VPN address 0.0.0.0 0.0.0.0

crypto ipsec transform-set AEGIS-TS esp-aes 256 esp-sha256-hmac
 mode transport

crypto ipsec profile AEGIS-PROFILE
 set transform-set AEGIS-TS

interface Tunnel1
 description TUNNEL HUB SANTO DOMINGO
 ip address 10.1.100.1 255.255.255.0
 ip mtu 1400
 tunnel source Ethernet0/0
 tunnel mode gre multipoint
 ip nhrp network-id 2026
 ip nhrp map multicast dynamic
 ip nhrp authentication AEGIS
 ip ospf network point-to-multipoint
 ip ospf 1 area 0
 tunnel protection ipsec profile AEGIS-PROFILE
 no shutdown

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
! ENDURECIMIENTO DE SEGURIDAD Y DMVPN IPSEC - R-SANTIAGO
! ============================================================
enable
configure terminal

crypto isakmp policy 10
 encr aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 3600
crypto isakmp key AEGIS-2026-VPN address 0.0.0.0 0.0.0.0

crypto ipsec transform-set AEGIS-TS esp-aes 256 esp-sha256-hmac
 mode transport

crypto ipsec profile AEGIS-PROFILE
 set transform-set AEGIS-TS

interface Tunnel1
 description TUNNEL SPOKE SANTIAGO
 ip address 10.1.100.2 255.255.255.0
 ip mtu 1400
 tunnel source Ethernet0/0
 tunnel mode gre multipoint
 ip nhrp network-id 2026
 ip nhrp map 10.1.100.1 1.0.0.2
 ip nhrp map multicast 1.0.0.2
 ip nhrp nhs 10.1.100.1
 ip nhrp authentication AEGIS
 ip ospf network point-to-multipoint
 ip ospf 1 area 0
 tunnel protection ipsec profile AEGIS-PROFILE
 no shutdown

interface Ethernet0/1.99
 ip ospf 1 area 20

router ospf 1
 router-id 2.2.2.2
 passive-interface default
 no passive-interface Ethernet0/1.99
 no passive-interface Tunnel1
 network 10.0.10.0 0.0.1.255 area 20
 network 10.0.12.0 0.0.0.255 area 20
 network 10.0.14.0 0.0.0.255 area 20
 network 10.0.17.32 0.0.0.15 area 20
 network 10.0.19.0 0.0.0.3 area 20
 network 10.1.100.0 0.0.0.255 area 0
 default-information originate

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
! ENDURECIMIENTO DE SEGURIDAD Y DMVPN IPSEC - R-ROMANA
! ============================================================
enable
configure terminal

crypto isakmp policy 10
 encr aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 3600
crypto isakmp key AEGIS-2026-VPN address 0.0.0.0 0.0.0.0

crypto ipsec transform-set AEGIS-TS esp-aes 256 esp-sha256-hmac
 mode transport

crypto ipsec profile AEGIS-PROFILE
 set transform-set AEGIS-TS

interface Tunnel1
 description TUNNEL SPOKE LA ROMANA
 ip address 10.1.100.3 255.255.255.0
 ip mtu 1400
 tunnel source Ethernet0/0
 tunnel mode gre multipoint
 ip nhrp network-id 2026
 ip nhrp map 10.1.100.1 1.0.0.2
 ip nhrp map multicast 1.0.0.2
 ip nhrp nhs 10.1.100.1
 ip nhrp authentication AEGIS
 ip ospf network point-to-multipoint
 ip ospf 1 area 0
 tunnel protection ipsec profile AEGIS-PROFILE
 no shutdown

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
! ENDURECIMIENTO DE SEGURIDAD Y DMVPN IPSEC - R-PUERTOPLATA
! ============================================================
enable
configure terminal

crypto isakmp policy 10
 encr aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 3600
crypto isakmp key AEGIS-2026-VPN address 0.0.0.0 0.0.0.0

crypto ipsec transform-set AEGIS-TS esp-aes 256 esp-sha256-hmac
 mode transport

crypto ipsec profile AEGIS-PROFILE
 set transform-set AEGIS-TS

interface Tunnel1
 description TUNNEL SPOKE PUERTO PLATA
 ip address 10.1.100.4 255.255.255.0
 ip mtu 1400
 tunnel source Ethernet0/0
 tunnel mode gre multipoint
 ip nhrp network-id 2026
 ip nhrp map 10.1.100.1 1.0.0.2
 ip nhrp map multicast 1.0.0.2
 ip nhrp nhs 10.1.100.1
 ip nhrp authentication AEGIS
 ip ospf network point-to-multipoint
 ip ospf 1 area 0
 tunnel protection ipsec profile AEGIS-PROFILE
 no shutdown

interface Ethernet0/1
 description TRUNK HACIA SW-5
 no ip address
 duplex full
 no shutdown

router ospf 1
 router-id 5.5.5.5
 passive-interface default
 no passive-interface Ethernet0/1.310
 no passive-interface Ethernet0/1.320
 no passive-interface Ethernet0/1.330
 no passive-interface Ethernet0/1.340
 no passive-interface Ethernet0/1.350
 no passive-interface Tunnel1
 network 10.0.0.0 0.0.1.255 area 40
 network 10.0.2.0 0.0.1.255 area 40
 network 10.0.4.0 0.0.1.255 area 40
 network 10.0.6.0 0.0.1.255 area 40
 network 10.0.17.64 0.0.0.15 area 40
 network 10.1.100.0 0.0.0.255 area 0
 default-information originate

ip access-list standard ACL-ADMIN-VTY
 permit 10.0.0.0 0.0.1.255
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

spanning-tree mode rapid-pvst
spanning-tree extend system-id
spanning-tree vlan 310,320,330,340,350 priority 24576

interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

interface range Ethernet0/1 - 2
 switchport trunk native vlan 999
 switchport nonegotiate
 spanning-tree guard root
 ip dhcp snooping trust
 ip arp inspection trust

ip dhcp snooping
ip dhcp snooping vlan 310,320,330,340,350
no ip dhcp snooping information option

ip arp inspection vlan 310,320,330,340,350
ip arp inspection validate src-mac dst-mac ip

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

interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

ip dhcp snooping
ip dhcp snooping vlan 310,320
no ip dhcp snooping information option

ip arp inspection vlan 310,320
ip arp inspection validate src-mac dst-mac ip

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

interface Ethernet0/0
 switchport trunk native vlan 999
 switchport nonegotiate
 ip dhcp snooping trust
 ip arp inspection trust

ip dhcp snooping
ip dhcp snooping vlan 330,340,350
no ip dhcp snooping information option

ip arp inspection vlan 330,340,350
ip arp inspection validate src-mac dst-mac ip

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
