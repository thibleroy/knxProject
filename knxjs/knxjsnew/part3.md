## Partie III

![Alt text](images/gns3-prise-en-main.png?raw=true "Détail de la fenêtre du simulateur")

**Configuration basique du routeur**
1.	Lancer le simulateur GNS3. Glisser/déposer deux routeurs sur le plan de travail. Un routeur du type c7200 fera office de routeur et un autre de type c3600 fera office de PC. Reliez les deux entités par un câble *FastEthernet*.

2.	Changer le nom du routeur c7200 afin qu’il se nomme R0 et changer le nom du routeur c3600 afin qu’il se nomme PC1.

3.	Quelles sont les caractéristiques IP par défaut du routeur ?

4.	Assigner l’addresse IP 192.168.1.1 au routeur R0. Rappeler à quoi sert le *netmask*, et indiquer/justifier quel *netmask* avez vous choisi. 

5.	Vérifier la configuration IP de l’interface et activer là.

**Initiation à l’analyse de protocole : exemple de CDP et ECTP**

6.	Activer la capture de l’interface *FastEthernet* du routeur connecté à PC1 (R0 (f1/0) -> PC1 (f0/0)). Patienter quelques minutes et lancer *Wireshark* sur la capture réalisée. Identifier les protocoles utilisés sur lien réseau. 

7.	Identifier les trames encapsulant le protocole CDP (*Cisco Discovery Protocol*). En analysant la trame vous devriez comprendre le rôle de ce protocole et pouvoir répondre aux questions suivantes. A chaque réponse indiquer à quelle couche du modèle OSI vous vous situez.
  - (a)	A qui est destiné le message envoyé ? Quelle est l’adresse IP du destinataire ? Pourquoi ?
  - (b)	Quelle est la fréquence de ces messages ?
  - (c)	Quelles informations fondamentales ce protocole véhicule ?
8.	Réinitialiser la capture du trafic réseau de *Wireshark* (arrêter, puis démarrer une nouvelle capture). Assigner dorénavant une adresse IP à la station PC1 de façon à ce qu’elle soit sur le même réseau IP que le routeur R0. La station PC1 utilise t’elle le protocole CDP ? Pourquoi ?  

9.	Tester alternativement les commandes relatives au protocole CDP sur le routeur R0 et la station PC1 via les commandes **show cdp trafic, show cdp neighbors, show cdp neighbors détail, show cdp**. Ces commandes génèrent-elles de nouveaux messages CDP sur le réseau ? Quel est le mode de fonctionnement de ce protocole ?

10.	Le protocole CDP ne nous sera plus utile momentanément. Désactiver CDP de l’interface, sur laquelle le protocole a été perçu, à l’aide de la commande **no cdp run** sur chaque routeur. Cette commande génère t’elle du trafic réseau ? Pourquoi ? L’usage du protocole CDP peut-il être gênant sur un réseau de production ? Pourquoi ?

11.	A terme, vous ne devriez capturer plus que des messages réseaux issus du protocole ECTP (Ethernet Configuration Testing Protocol).  A votre avis, suivant la capture *Wireshark* obtenue, dans quel but le protocole ECTP est-il utilisé par les routeurs CISCO ? 

12.	Désactiver le protocole ECTP sur chacune des interfaces utilisées via la commande **no keepalive**. Normalement vous ne devriez ne plus avoir de trafic capturé.

**Analyse d'ARP**

13.	Réinitialiser la capture réseau. Faire un **ping** du routeur R0 vers PC1 et vice versa. Vous devriez obtenir la capture réseau suivante :
 
![Alt text](images/gns3-trafic-reseau.png?raw=true "Analyse du trafic réseau")

Suivant votre capture, déduisez le rôle du protocole ARP ? Pourquoi le protocole ICMP est-il utilisé ? Faire un diagramme de séquence des messages véhiculés sur le réseau et provoqués par la commande **ping**.

14.	Quelle est la valeur de l’@ Ethernet source et destination d’une requête ARP ? Pourquoi ?

15.	A votre avis, que se passe t’il si de très nombreux paquets ARP sont générés sur le réseau ? Pourquoi ?

16.	Réitérer plusieurs **ping** de R0 vers PC1 et vice versa. De nouveaux messages ARP sont-ils de nouveau émis ? Si oui justifiez, sinon précisez les différents cas susceptibles d’être responsable d’une nouvelle génération de messages ARP.

17.	Que se passe t’il si vous changez l’adresse IP de la station PC1 ? Justifiez, testez et décrire la trace réseau correspondante. Percevez-vous de nouveaux messages ARP ? pourquoi ? 

18.	Peut-on utiliser ARP sur Internet ? Pourquoi ?

**Résolution de nom statique**

19.	Faire un **ping R0** et/ou **ping PC1** à partir de PC1. Quel est le retour de la commande ? Pourquoi ? Analyser/expliquer en conséquence la trace réseau résultante. 

20.	Saisir les commandes suivantes sur PC1 : **config t ; ip host PC1 @IP_PC1 ; ip host R0 @IP_R0 ; end** et refaire un **ping R0** et/ou un **ping PC1** à partir de R0 et de PC1. Quels sont les retours de ces commandes ? Pourquoi ? Analyser/expliquer en conséquence les traces réseau résultantes. Quels sont les avantages et/ou inconvénients des commandes tapées ?

21.	Faire un ping **www.google.fr**. Quelles observations peut on faire ? Rappeler le fonctionnement de la résolution de nom, et schématiser  le fonctionnement du **résolver**.

22.	Saisir les commandes suivantes : **config t ; no ip domain lookup**. Quel est l’effet de ces commandes ? Pourquoi ? Quels sont les répercutions sur la stratégie du résolver ?

**Notion de routage**

L’administrateur décide de modifier la topologie du réseau, et obtient la topologie suivante.
 
 
![Alt text](images/gns3-modification-topologie.png?raw=true "Modification de la topologie")


23.	Répercuter les modifications de topologie sur votre topologie et configurer en conséquence la station PC2 (Ne pas oublier de désactiver le protocole CDP et ETCP de son interface active). Indiquer les commandes effectuer sur chaque entité concernée.

24.	Démarrer la capture du trafic réseau sur les interfaces PC1(f0/0) et PC2(f0/0).  On souhaite à partir de la station PC1 faire un ping de la station PC2. **Théoriquement** : sur le schéma de la Figure ci-dessus: (i) indiquer quels sont les messages ARP générés et leurs cheminements au travers le réseau, (ii) indiquer également le cheminement des messages ICMP. **Par la pratique**, vérifier la validité de vos réponses précédentes et analyser les traces sur les deux segments réseaux. Les requêtes ICMP de type ECHO atteignent-elles les interfaces f1/0 et f1/1 du routeur R0 et l’interface de la station PC2 ? Pourquoi ?

25.	Saisissez les commandes suivantes sur la station PC1 : **ip route 0.0.0.0 0.0.0.0 192.168.1.1**. Quel est l’effet de cette commande ? (Aidez vous des traces réseaux issues de la capture, et relever quels sont les @MACs et @IPs source et destination). Les requêtes ICMP de type ECHO atteignent-elles les interfaces f1/0 et f1/1 du routeur R0 et l’interface de la station PC2 ? Mettre à jour votre schéma précédent à partir de votre expérimentation.

26.	A partir des traces réseau, indiquer si les requêtes ICMP de type ECHO sont elles suivies de réponses ICMP de type ECHO. Justifiez, et sinon identifier le problème et rectifier le.

**Attribution dynamique d’adresse IP**

L’administrateur ajoute de nouvelles stations et décide d’utiliser DHCP pour attribuer automatiquement une @IP aux stations du réseau. Il obtient la topologie suivante :

![Alt text](images/gns3-Activation-DHCP.png?raw=true "Activation du service DHCP")

27.	Répercuter les modifications de topologie sur votre topologie. Quel(s) élément(s) actif(s) allez vous rajouter à votre réseau ? Ne pas configurer manuellement les @IP des stations PC3 et PC4. (Ne pas oublier de désactiver le protocole CDP et ETCP de son interface active)

28.	Les stations PC1 et PC2 restent configurées manuellement, par contre les stations PC4 et PC3 deviennent des clients DHCP. Activer la capture de trafic sur le réseau 192.168.1.0/24 et 192.168.2.0/24. Activer le client DHCP sur ces stations, utiliser la commande **ip address dhcp** sur les interfaces réseaux concernées.

29.	Vérifier que le DHCP a bien été activé.  Quelles sont les conséquences de l’activation du client DHCP sur les stations PC4 et PC3 sur le réseau ? Analyser les traces réseaux. Indiquer :
   - (a)	Quels sont les messages générés, 
   - (b)	Quels sont les protocoles sous-jacents, 
   - (c)	Comment sont encapsuler les messages,
   - (d)	Pour chaque message, précisez quels sont les @Ethernet/IP source et destination, les ports utilisés, les options utilisés.
   - (e)	Quelles sont les informations que cherche à obtenir le client DHCP ?
30.	L’attribution dynamique d’@IP fonctionne selon un mode client/serveur. Activer le serveur DHCP sur le routeur R0 via les commandes **service dhcp ; ip dhcp pool nom_du_pool;** Dans le sous mode dhcp, lister l’ensemble des commandes disponibles. Indiquer le réseau IP sur lequel vous souhaitez activer le serveur DHCP et Configurer l’option qui permet d’ajouter un  routeur par défaut.

31.	Combien de réseaux IP devez-vous configurer ? Pourquoi ? 
 
32.	Sur le réseau 192.168.1.0/24, Quelles sont les conséquences de l’activation du serveur DHCP sur le routeur ? Analyser les traces réseaux. Indiquer :
  - (a)	Quels sont les messages générés, 
  - (b)	Indiquer les raisons pour lesquelles ces messages sont de type *Broadcast ou Unicast*,
  - (c)	Pourquoi des messages ARP sont-ils générés ? justifiez.
  - (d)	Pour chaque message, précisez quels sont les @Ethernet/IP source et destination, les ports utilisés, les options utilisées.

33.	Une erreur, indiquant qu’il y a un conflit d’@IP, est susceptible de s’afficher sur la console du routeur R0. Indiquer pourquoi et résoudre le problème. Pour vérifier la configuration DHCP du routeur utiliser la commande **show ip dhcp arg**.

34.	A partir des précédentes questions, donner un diagramme de séquence des messages qui transitent dans le réseau afin d’affecter une @IP à une station. 

35.	Annoter le schéma de la Figure ci-dessus en indiquant le cheminement des différents messages sur le réseau.

36.	L’administrateur du réseau décide de rajouter un nouveau réseau. Mettez à jour votre topologie suivant le schéma ci-dessous.
 
 ![Alt text](images/gns3-topologie-cplx.png?raw=true "Modification de la topologie")
 
 
37.	Activer la station PC5 comme client DHCP. Suivant les traces réseaux, la station parvient-elle à obtenir une @IP à partir du serveur DHCP ? Pourquoi ? Proposer une solution, discuter des avantages/inconvénients.

38.	Activer la capture du trafic sur le réseau 192.168.2.0/24 et sur le réseau 192.168.3.0/24. Sur le routeur R1, paramétrer l’interface du routeur connectée au réseau 192.168.3.0 en tapant la commande **ip helper-address 192.168.2.1**. Sur la station PC5, réitérer le renouvellement d’un bail DHCP via la commande **renew dhcp**. En vous aidant des traces réseaux, indiquer quelle est la conséquence de la commande taper sur le router R1 ? 

39.	La station PC5 obtient-elle son @IP dynamique ? Si non, déterminer le problème et le résoudre.

40.	Donner le diagramme de séquence des messages échangés qui ont permis à la station PC5 d’obtenir une @IP dynamiquement.


