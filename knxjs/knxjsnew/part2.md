## Partie II

**Configuration interne d'un routeur**
On rappel qu’un routeur se distingue des autres entités réseaux comme les Ponts, les Hubs, et les Switch par le fait qu’il embarque un processeur, un système d’exploitation et de la mémoire. La Figure ci-dessous, illustre la structure interne généralement observée d’un routeur.

![Alt text](images/gns3-structure-interne-router.png?raw=true "Structure interne d’un routeur")

Dans la suite de cette partie, nous allons nous intéresser aux différents principes de fonctionnement/configuration de l’OS des routeurs de type Cisco (IOS).

**Les modes de l’IOS Cisco**

L’OS des routeurs Cisco dispose de deux principaux modes de fonctionnement : (i) le mode utilisateur et (ii) le mode privilège. Par défaut, lorsque l’on se connecte au routeur, l’utilisateur se trouve dans le mode utilisateur ; Le mode utilisateur est caractérisé par l’invite de commande ‘>’ (voir ci-dessous, 1) tandis que le mode privilège est caractérisé par l’invite de commande ‘#’ (voir ci-dessous, 2) . Un mode peut être décomposer en sous modes. Par exemple, la configuration d’une interface réseau se fait par le sous mode config-if du mode configuration (voir ci-dessous, 4) .

1.	Connectez vous au routeur précédemment déposé sur le plan de travail. Faire un clique droit sur le routeur et sélectionner console pour ouvrir la console du routeur. A la question **Would you like to enter the initial configuration dialog ?**, répondre **no**.

2.	Chaque mode de fonctionnement dispose d’une liste limitée de commandes. Pour afficher les commandes disponibles dans un mode, utilisez la commande **?**. Saisir la commande **exit** ou tapez **Ctrl-Z** pour sortir d’un mode. Comparez les commandes disponibles dans le mode utilisateur (Figure ci-dessus,1) , privilège (Figure ci-dessus,2) et configuration (Figure ci-dessus,3) .

3.	Suivant les modes de fonctionnement, les commandes n’offrent pas les mêmes options. Comparer le résultat des commandes **show ?** dans le mode utilisateur et privilège. Exécutez la commande **show running-config** dans le mode utilisateur. Que se passe t’il ? Réitérez dans le mode privilégié. Quelles sont les caractéristiques des interfaces réseaux du routeur ? Identifiez le nom du routeur. Changer le nom du routeur.

4.	Changer le message du jour. Dans le mode configuration, tapez **banner motd #** puis saisir une phrase sur 2 lignes. Sortir du mode faisant un **exit** ou **Ctrl-Z**

5.	Protéger l’accès au *mode privilège* en spécifiant un mot de passe. Dans le mode configuration, utiliser la commande **enable password**.

6.	On cherche à modifier la description de l’interface FastEthernet du slot 0/0. Quel mode devez vous utiliser ? Une fois dans ce mode, chercher la commande adéquate, ajouter une description puis sortir du mode faisant un **exit** ou **Ctrl-Z**.

7.	Toutes les commandes précédentes modifient la configuration active du routeur. Selon vous dans quelle zone mémoire se situe la configuration active du routeur ? Que se passe t’il si vous redémarrez le routeur ?

8.	Quelle est la principale caractéristique de la mémoire NVRAM ? Dans le mode privilège, vérifier le contenu de la mémoire NVRAM du routeur (**dir nvram:**). Tapez **copy running-config startup-config**. Quel est l’effet de cette commande ? vérifier.

9.	En cas de mauvaises manipulations, vous pouvez toujours effacer le fichier startup-config par la commande **erase startup-config**.

10.	Tapez les commandes ci-dessous et précisez à quel niveau OSI les commandes suivantes collectent les informations : 
  a.	show interface
  b.	show ip interface
  c.	show ip route
  d.	ping
Ces commandes vous seront utiles ultérieurement pour vérifier la configuration du routeur.

