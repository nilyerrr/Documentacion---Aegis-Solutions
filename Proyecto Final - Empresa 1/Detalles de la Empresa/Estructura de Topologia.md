---

**Empresa:** Aegis Solutions (MSSP)  
**Materia:** TI-203 — Proyecto Final 2026-C2  
**Estado:** Fase 1 implementada; Fases 2-3 con scripts creados  

---

### 📄 Descripción del Proyecto

Diseño e implementación de la infraestructura de red y ciberseguridad para **Aegis Solutions**, un Proveedor de Servicios Gestionados de Seguridad (MSSP) con presencia en múltiples sedes geográficas:

|**Sede**|**Rol**|**Dominio**|**Estado**|
|---|---|---|---|
|🏙️ **Santo Domingo**|Sede Central (Hub / Core)|`aegis.com.do`|✅ Implementada|
|🌄 **Santiago**|Sede Sucursal (Spoke)|`aegis.com.do`|⚠️ Scripts creados|
|🏖️ **La Romana**|Sede Sucursal (Spoke)|`aegis.com.do`|✅ Implementada|
|🚢 **Puerto Plata**|Sede Sucursal (Spoke)|`aegis.com.do`|⚠️ Scripts creados|

La arquitectura implementa un modelo híbrido que combina un diseño jerárquico de 3 capas (Núcleo → Distribución → Acceso) en la sede central, con una topología **Hub-and-Spoke** para la interconexión nacional. Se utiliza segmentación por VLANs, enrutamiento dinámico OSPF multi-área sobre túneles **DMVPN**, redundancia de pasarela (HSRP) y un enfoque estricto de _Security by Design_ orientado a las operaciones del SOC.

---

### ⚙️ Tecnologías Implementadas

|**Tecnología**|**Descripción de la Implementación**|
|---|---|
|**OSPF Multi-área**|Enrutamiento dinámico con tipo de red _Point-to-Multipoint_. Áreas: 0 (Backbone/Túnel), 10 (SD), 20 (Santiago), 30 (La Romana), 40 (Puerto Plata).|
|**VLANs + 802.1Q**|Segmentación de tráfico departamental mediante _Router-on-a-Stick_ y subinterfaces.|
|**VLSM**|Direccionamiento eficiente y escalable basado en el bloque privado `10.0.0.0/8`.|
|**EtherChannel**|Agregación de enlaces (L2) configurada con **LACP `mode active`** para garantizar estabilidad y redundancia.|
|**STP / PortFast / BPDU Guard**|Prevención activa de bucles en capa 2 y protección de la topología en puertos de usuario.|
|**NAT Overload (PAT)**|Traducción de direcciones con listas de acceso extendidas para dar salida a Internet real.|
|**DMVPN (GRE + NHRP + IPsec)**|Túneles multipunto dinámicos encriptados con AES-256 para la interconexión ágil de todas las sedes.|
|**DHCP Server & Relay**|Asignación dinámica centralizada, utilizando _trust-all_ para evadir bloqueos de capa de enlace.|
|**Port Security**|Control de acceso físico estricto a los switches de la capa de acceso (MAC sticky, máx. 2, restrict).|
|**ACLs Extendidas**|Filtrado de tráfico para separar el flujo interno de la VPN del tráfico de salida a Internet (NAT).|
|**SSH v2 + RSA 2048**|Administración remota segura amarrada al dominio criptográfico de la empresa.|

---

### 🔒 Políticas de Seguridad

- **Credenciales de Administración:** Usuario único `admin` con contraseña `AEGIS-2026` (Nivel de privilegio 15). Aplicado uniformemente en todos los dispositivos.
    
- **Gestión Remota:** SSH v2 habilitado estrictamente en todos los dispositivos de enrutamiento y conmutación — Telnet deshabilitado por defecto.
    
- **Port Security (Capa 2):** Máximo **2 direcciones MAC** por puerto de acceso, acción de violación configurada en `restrict` con aprendizaje de MAC `sticky`.
    
- **Infraestructura VPN:** Túneles dinámicos (DMVPN) autenticados mediante claves NHRP (`AEGIS`) y precompartidas IPsec (`AEGIS-2026-VPN`), segmentando el tráfico corporativo del tráfico público.
    
- **Protección de Capa de Acceso:** BPDU Guard y PortFast habilitados en el 100% de los puertos orientados a usuarios finales.
    
- **Banner MOTD Legal:** Todo dispositivo presenta una advertencia legal disuasoria estandarizada, indicando que el acceso no autorizado está prohibido y monitorizado.
    
- **ACL de Administración VTY:** Restringido a subredes de Soporte Técnico y Administración únicamente.

---

# Rol de cada sucursal:

### 1. Santo Domingo: La Sede Central (Headquarters)

Esta es la columna vertebral administrativa y directiva de la empresa. Es la topología es la más robusta, utilizando un modelo jerárquico clásico de tres capas (Core, Distribución con SWM-1/SWM-2, y Acceso).

- **Rol Principal:** Gestión Corporativa y Operaciones de Negocio.
    
- **Departamentos que aloja:** Dirección General (VLAN 10), Recursos Humanos (VLAN 20), Cumplimiento y Auditoría (VLAN 30), Soporte Técnico (VLAN 40), Finanzas (VLAN 50), Ventas (VLAN 60) y Marketing (VLAN 70).
    
- **Propósito:** Aquí se toman las decisiones de negocio, se maneja la nómina, las ventas masivas y el cumplimiento legal. Es el cerebro administrativo que mantiene la empresa a flote comercialmente.

![[Pasted image 20260814164925.png]]

### 2. Puerto Plata: El Centro de Operaciones de Seguridad (SOC)

Esta sucursal está completamente aislada de las operaciones administrativas tradicionales. Es tu fortaleza técnica y tu área de especialidad directa como CISO.

- **Rol Principal:** Defensa, Investigación y Seguridad Ofensiva.
    
- **Departamentos que aloja:** DFIR (VLAN 310), Malware Research Lab (VLAN 320), Threat Intelligence (VLAN 330), Red Team (VLAN 340) y Ciberseguridad/SOC (VLAN 350).
    
- **Propósito:** Es el búnker técnico de la empresa. Desde aquí, los ingenieros de ciberseguridad monitorean la red, cazan amenazas, analizan malware aislado e intentan vulnerar los propios sistemas (Red Team) para asegurar que la infraestructura de los clientes y la propia sea impenetrable.
    
- **Estado:** ⚠️ Scripts creados (R-PUERTO-PLATA, SW-5, sw-30, sw-31). Pendientes de integración.

![[Pasted image 20260814164942.png]]

### 3. Santiago: Centro de Datos Regional y Corporativo

Esta sede tiene una mezcla entre administración y alojamiento de servicios críticos. Cuenta con un servidor dedicado y un esquema de switching multicapa.

- **Rol Principal:** Nodo de Servicios (Data Center) y Ventas Regionales.
    
- **Departamentos que aloja:** Centro de Datos (VLAN 110), Servidores (VLAN 199), Ventas Corporativas (VLAN 130) y Administración (VLAN 140).
    
- **Propósito:** Actúa como el motor tecnológico de la zona norte. Al tener un "Centro de Datos" y "Servidores" en su propia VLAN (199 y 110), funciona como el sitio principal de alojamiento de aplicaciones de la empresa o como un sitio de recuperación ante desastres (Disaster Recovery) para respaldar a Santo Domingo.
    
- **Estado:** ⚠️ Scripts creados (R-SANTIAGO, SW-1, SW-2). Pendientes de integración. Servidores Linux pendientes.

![[Pasted image 20260814164953.png]]

### 4. La Romana: Centro de Ingeniería y Consultoría

Esta sede tiene un enfoque mucho más técnico orientado al servicio al cliente y al mantenimiento de redes.

- **Rol Principal:** Soporte de Infraestructura y Servicios de Consultoría TI.
    
- **Departamentos que aloja:** Dirección Regional (VLAN 210), Consultoría TI (VLAN 220) e Ingeniería de Infraestructura (VLAN 230).
    
- **Propósito:** Es el brazo operativo de despliegue de redes. Los ingenieros de esta sucursal (Ingeniería de Infraestructura) son los encargados de diseñar topologías, configurar OSPF/BGP, y brindar consultoría tecnológica a los clientes externos en la zona este.

![[Pasted image 20260814165002.png]]

---

## 📊 Resumen de Áreas OSPF por Sede

| Sede | Área OSPF | Rol |
|---|---|---|
| Santo Domingo | Área 10 | Sede Central / Hub |
| Santiago | Área 20 | Sucursal / Spoke |
| La Romana | Área 30 | Sucursal / Spoke |
| Puerto Plata | Área 40 | Sucursal / Spoke |
| DMVPN (Tunnel1) | Área 0 (Backbone) | Interconexión WAN |

---

## 🔗 Referencias

- Detalle de equipos: [[Descripion de equipos.md]]
- VLSM y direccionamiento: [[Departamentos y VLSM.md]]
- Seguridad de equipos: [[Medidas de seguridad para los equipos.md]]
- Roles del equipo: [[Roles y cargos de los integrantes.md]]
- Cotización de servicios: [[Cotizacion por nuestros servicios.md]]
