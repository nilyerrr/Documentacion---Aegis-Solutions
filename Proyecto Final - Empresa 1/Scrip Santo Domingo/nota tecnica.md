
**Nota Técnica - Diagnóstico y Solución de DHCP en Santo Domingo**

### Diagnóstico del Problema:
1. **Confianza de la Opción 82 en el Router (`R-SD`):** Al usar *DHCP Relay* (`ip helper-address`) desde los switches Multicapa, Cisco IOS descarta por defecto los paquetes DHCP que contienen la **Opción 82** si el router no tiene habilitada la confianza explícita (`ip dhcp relay information trust`).
2. **Bug de IOL (IOS en Linux) y Opción 82 en Switches:** Las imágenes de laboratorio IOL insertan o procesan la Opción 82 bloqueando respuestas DHCP si Snooping está habilitado o la Opción 82 no se deshabilita expresamente en los switches.
3. **Conflicto de IP WAN:** La interfaz `Ethernet0/0` de `R-SD` compartía la IP `1.0.0.1` con la interfaz `Ethernet0/3` del `ISP-NUBE`. Se corrigió la IP de `R-SD` a `1.0.0.2/30`.

---

### Comandos de Corrección por Dispositivo:

#### 1. En Router Principal (`R-SD`):
```cisco
configure terminal
ip dhcp relay information trust
interface Ethernet0/0
 ip address 1.0.0.2 255.255.255.252
end
write memory
```

#### 2. En Switches Multicapa (`SWM-1` y `SWM-2`):
```cisco
configure terminal
no ip dhcp snooping
no ip dhcp snooping information option
end
write memory
```

#### 3. En Switches de Acceso (`SW-10`, `SW-11`, `SW-12`):
```cisco
configure terminal
no ip dhcp snooping
no ip dhcp snooping information option
no ip arp inspection vlan 10,20,30,40,50,60,70,99
end
write memory
```