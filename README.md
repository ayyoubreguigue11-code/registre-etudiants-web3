# Registre des étudiants — Blockchain, tests et CI/CD

Projet académique : smart contract Solidity, tests automatisés avec Hardhat,
intégration continue et déploiement contrôlé sur Ethereum Sepolia avec GitHub Actions.

## Fonctions du contrat

- enregistrer le nom et le prénom d'un étudiant ;
- conserver l'adresse du compte ayant effectué l'enregistrement ;
- conserver la date d'enregistrement sur la blockchain ;
- consulter un étudiant par son identifiant ;
- récupérer la liste complète et le nombre total d'étudiants.

## Installation locale

Prérequis : Node.js 20 LTS et npm.

```bash
npm install
npm run compile
npm test
```

Les tests utilisent le réseau local temporaire de Hardhat et ne dépensent aucun ETH.

## Déploiement local

```bash
npm run deploy:local
```

## Déploiement Sepolia avec GitHub Actions

Dans le dépôt GitHub, créer un environnement nommé `sepolia`, puis ajouter :

- `SEPOLIA_RPC_URL` : URL RPC du réseau Sepolia ;
- `PRIVATE_KEY` : clé privée d'un compte de test contenant du SepoliaETH.

Ne jamais placer ces valeurs dans le code ou dans un fichier envoyé sur GitHub.

Ensuite : **Actions → Deploiement controle sur Sepolia → Run workflow**.
Le workflow compile et teste le contrat avant son déploiement. Il produit ensuite
un artefact `preuve-deploiement-sepolia` contenant l'adresse et le hash de transaction.

## Organisation

```text
contracts/                   contrat Solidity
test/                        tests automatisés
scripts/                     script de déploiement
.github/workflows/ci.yml     intégration continue
.github/workflows/deploy-sepolia.yml  déploiement Sepolia
docs/architecture.md         relation entre les technologies
```

## Sécurité

Utiliser uniquement un compte MetaMask de test, sans fonds réels. Le fichier `.env`
est ignoré par Git afin d'éviter la publication accidentelle des secrets.
## Déploiement sur Sepolia

- **Contrat :** RegistreEtudiants
- **Réseau :** Ethereum Sepolia
- **Chain ID :** 11155111
- **Adresse du contrat :** `0x0385ACc88B062ADF3040618F1910B14862286e7C`
- **Explorateur :** [Voir le contrat sur Sepolia Etherscan](https://sepolia.etherscan.io/address/0x0385ACc88B062ADF3040618F1910B14862286e7C)
- **Preuve de déploiement :** `deployments/sepolia.json`
- **Déploiement automatisé :** GitHub Actions