### 📄 Descripción del Proyecto

Diseño e implementación de la infraestructura de red y ciberseguridad para **Aegis Solutions**, un Proveedor de Servicios Gestionados de Seguridad (MSSP) con presencia en múltiples sedes geográficas:

|**Sede**|**Rol**|**Dominio**|
|---|---|---|
|🏙️ **Santo Domingo**|Sede Central (Hub / Core)|`aegis.com.do`|
|🌄 **Santiago**|Sede Sucursal (Spoke)|`aegis.com.do`|
|🏖️ **La Romana**|Sede Sucursal (Spoke)|`aegis.com.do`|
|🚢 **Puerto Plata**|Sede Sucursal (Spoke)|`aegis.com.do`|

La arquitectura implementa un modelo híbrido que combina un diseño jerárquico de 3 capas (Núcleo → Distribución → Acceso) en la sede central, con una topología **Hub-and-Spoke** para la interconexión nacional. Se utiliza segmentación por VLANs, enrutamiento dinámico OSPF multi-área sobre túneles **DMVPN**, redundancia de pasarela (HSRP) y un enfoque estricto de _Security by Design_ orientado a las operaciones del SOC.


************************************************************

### ⚙️ Tecnologías Implementadas 

|**Tecnología**|**Descripción de la Implementación**|
|---|---|
|**OSPF Multi-área**|Enrutamiento dinámico con tipo de red _Point-to-Multipoint_ (Área 0 Core, Área 30 Romana, etc.).|
|**VLANs + 802.1Q**|Segmentación de tráfico departamental mediante _Router-on-a-Stick_ y subinterfaces.|
|**VLSM**|Direccionamiento eficiente y escalable basado en el bloque privado `10.0.0.0/8`.|
|**EtherChannel**|Agregación de enlaces (L2) configurada en `mode on` para garantizar estabilidad y redundancia.|
|**STP / PortFast / BPDU Guard**|Prevención activa de bucles en capa 2 y protección de la topología en puertos de usuario.|
|**NAT Overload (PAT)**|Traducción de direcciones con listas de acceso extendidas para dar salida a Internet real.|
|**DMVPN (GRE + NHRP)**|Túneles multipunto dinámicos para la interconexión ágil y encriptable de todas las sedes.|
|**DHCP Server & Relay**|Asignación dinámica centralizada, utilizando _trust-all_ para evadir bloqueos de capa de enlace.|
|**Port Security**|Control de acceso físico estricto a los switches de la capa de acceso.|
|**ACLs Extendidas**|Filtrado de tráfico para separar el flujo interno de la VPN del tráfico de salida a Internet (NAT).|
|**SSH v2 + RSA 2048**|Administración remota segura amarrada al dominio criptográfico de la empresa.|

**************************
### 🔒 Políticas de Seguridad

- **Credenciales de Administración:** Usuario único `admin` con contraseña `AEGIS-2026` (Nivel de privilegio 15).
    
- **Gestión Remota:** SSH v2 habilitado estrictamente en todos los dispositivos de enrutamiento y conmutación — Telnet deshabilitado por defecto.
    
- **Port Security (Capa 2):** Máximo **2 direcciones MAC** por puerto de acceso, acción de violación configurada en `restrict` con aprendizaje de MAC `sticky`.
    
- **Infraestructura VPN:** Túneles dinámicos (DMVPN) autenticados mediante claves NHRP precompartidas, segmentando el tráfico corporativo del tráfico público.
    
- **Protección de Capa de Acceso:** BPDU Guard y PortFast habilitados en el 100% de los puertos orientados a usuarios finales.
    
- **Banner MOTD Legal:** Todo dispositivo presenta una advertencia legal disuasoria estandarizada para el proyecto TI-203 (Falta agregar), indicando que el acceso no autorizado está prohibido y monitorizado.

