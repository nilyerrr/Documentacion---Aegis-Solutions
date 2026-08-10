enable
configure terminal

hostname R-SANTIAGO
no ip domain-lookup

! --- Enlace hacia el ISP ---
interface Ethernet0/0
 description WAN HACI EL ISP
 ip address 1.0.0.6 255.255.255.252
 no shutdown
 exit

! --- Ruta por defecto (Gateway) ---
ip route 0.0.0.0 0.0.0.0 1.0.0.5

end
write memory