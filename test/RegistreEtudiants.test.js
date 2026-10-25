const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RegistreEtudiants", function () {
  async function deployFixture() {
    const [proprietaire, autreCompte] = await ethers.getSigners();
    const Registre = await ethers.getContractFactory("RegistreEtudiants");
    const registre = await Registre.deploy();
    await registre.waitForDeployment();
    return { registre, proprietaire, autreCompte };
  }

  it("demarre avec une liste vide", async function () {
    const { registre } = await deployFixture();
    expect(await registre.nombreEtudiants()).to.equal(0n);
  });

  it("enregistre puis retourne un etudiant", async function () {
    const { registre, proprietaire } = await deployFixture();

    await expect(registre.enregistrer("REGUIGUE", "AYYOUB"))
      .to.emit(registre, "EtudiantEnregistre")
      .withArgs(0n, "REGUIGUE", "AYYOUB", proprietaire.address);

    expect(await registre.nombreEtudiants()).to.equal(1n);
    const etudiant = await registre.consulter(0);
    expect(etudiant.nom).to.equal("REGUIGUE");
    expect(etudiant.prenom).to.equal("AYYOUB");
    expect(etudiant.enregistrePar).to.equal(proprietaire.address);
    expect(etudiant.dateEnregistrement).to.be.greaterThan(0n);
  });

  it("conserve le compte qui a effectue l'enregistrement", async function () {
    const { registre, autreCompte } = await deployFixture();
    await registre.connect(autreCompte).enregistrer("TEST", "ALICE");
    const etudiant = await registre.consulter(0);
    expect(etudiant.enregistrePar).to.equal(autreCompte.address);
  });

  it("refuse un nom ou un prenom vide", async function () {
    const { registre } = await deployFixture();
    await expect(registre.enregistrer("", "AYYOUB")).to.be.revertedWith(
      "Le nom est obligatoire"
    );
    await expect(registre.enregistrer("REGUIGUE", "")).to.be.revertedWith(
      "Le prenom est obligatoire"
    );
  });

  it("refuse un identifiant inexistant", async function () {
    const { registre } = await deployFixture();
    await expect(registre.consulter(0)).to.be.revertedWith(
      "Etudiant introuvable"
    );
  });
});
