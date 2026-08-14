enable
configure terminal
hostname SW-2
no ip domain-lookup

vlan 99
 name TRANSITO_WAN
vlan 110
 name CENTRODEDATOS
vlan 130
 name VENTASCORP
vlan 140
 name ADMINISTRACION
vlan 199
 name SERVIDORES
exit

! --- EtherChannel hacia SW-1 (LACP) ---
interface range Ethernet0/0-1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 99,110,130,140,199
 channel-group 1 mode active
 no shutdown

interface Port-channel1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 99,110,130,140,199

! --- Puertos de acceso ---
interface Ethernet0/2
 description Server Linux (DHCP-DNS-NFS-RADIUS-FTP)
 switchport mode access
 switchport access vlan 199
 no shutdown

interface Ethernet1/0
 description PC Centro de Datos
 switchport mode access
 switchport access vlan 110
 no shutdown

interface Ethernet1/1
 description PC Ventas
 switchport mode access
 switchport access vlan 130
 no shutdown

interface Ethernet1/3
 description PC Administracion
 switchport mode access
 switchport access vlan 140
 no shutdown

interface Ethernet0/3
 description PC Corporativa
 switchport mode access
 switchport access vlan 130
 no shutdown

! --- Interfaz de Gestión (Si aplica, se puede usar VLAN99 o dejar sin IP) ---
! (Sin SVIs de Gateway ni enrutamiento OSPF, ya que el enrutamiento lo hace SWM-1)

enable secret AEGIS-2026
username admin privilege 15 secret AEGIS-2026
line con 0
 logging synchronous
 exec-timeout 5 0
line vty 0 4
 login local
 transport input ssh
 exec-timeout 5 0
end
write memory