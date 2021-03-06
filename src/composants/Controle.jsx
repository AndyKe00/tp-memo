import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as crudTaches from '../services/crud-taches';



export default function Controle({etatTaches, utilisateur}) {
  
  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton
        // onClick={() => afficherTout()}
         value={'toutes'}>Toutes</ToggleButton>
        <ToggleButton
         onClick={() => crudTaches.lireCompletees(utilisateur.uid)}
         value={true}>Complétées</ToggleButton>
        <ToggleButton
         onClick={() => crudTaches.afficherActives(utilisateur.uid)}
         value={false}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
      {etatTaches.reduce(() => etatTaches[0].length - etatTaches[0].map(a => a.completee).filter(Boolean).length)} tâches restantes
      </span>
      <IconButton 
        aria-label="delete" 
        size="small" 
        variant="contained" 
        color="secondary" 
        onClick={() => crudTaches.supprimerCompletees(utilisateur.uid)} 
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}



