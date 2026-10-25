// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title RegistreEtudiants
 * @notice Enregistre et consulte des étudiants sur la blockchain.
 */
contract RegistreEtudiants {
    struct Etudiant {
        string nom;
        string prenom;
        address enregistrePar;
        uint256 dateEnregistrement;
    }

    Etudiant[] private etudiants;

    event EtudiantEnregistre(
        uint256 indexed id,
        string nom,
        string prenom,
        address indexed enregistrePar
    );

    function enregistrer(string calldata nom, string calldata prenom) external {
        require(bytes(nom).length > 0, "Le nom est obligatoire");
        require(bytes(prenom).length > 0, "Le prenom est obligatoire");

        uint256 id = etudiants.length;
        etudiants.push(
            Etudiant({
                nom: nom,
                prenom: prenom,
                enregistrePar: msg.sender,
                dateEnregistrement: block.timestamp
            })
        );

        emit EtudiantEnregistre(id, nom, prenom, msg.sender);
    }

    function nombreEtudiants() external view returns (uint256) {
        return etudiants.length;
    }

    function consulter(uint256 id) external view returns (Etudiant memory) {
        require(id < etudiants.length, "Etudiant introuvable");
        return etudiants[id];
    }

    function obtenirTousLesEtudiants() external view returns (Etudiant[] memory) {
        return etudiants;
    }
}
