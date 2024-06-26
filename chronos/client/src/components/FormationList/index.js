import React, { useState } from 'react';

// Import des sous composants
import StudentAbsList from '../StudentAbsList';
import ChronosValidateCard from '../ChronosValidateCard';


const FormationList = ({ Formation }) => {
    const [isVisible, setIsVisible] = useState(true); // État pour suivre la visibilité de la liste des élèves

    // Rend visible ou invisible la liste des élèves de la formation
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <h2 onClick={handleClick} style={{width: 600, color: '#FF0000'}}>{Formation.libelle}</h2>
            {isVisible && <div>
                {Formation.Eleves
                    .sort((a, b) => a.Utilisateur.nom.localeCompare(b.Utilisateur.nom)) // Trie les élèves par leur nom dans l'ordre alphabétique
                    .map((student) => ( // Groupes de chaque formation
                        <StudentAbsList key={student.id} Student={student} />
                ))}
                
            </div>}
        </div>
    );
};

export default FormationList;
