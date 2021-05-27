import firebase from 'firebase/app';
import { collUtil, collTaches } from './config';
import { instanceFirestore } from './firebase-initialisation';

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = firebase.firestore.FieldValue.serverTimestamp();
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .add(tache).then(
      tacheRef => tacheRef.get()
    );
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid) {
  const taches = [];
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
                  .orderBy('completee', 'desc')
                  .orderBy('date', 'desc').get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()})
                    }
                  )
                ).then(
                  () => taches
                );
}

/**
 * Modifie l'état d'une tâche dans Firestore pour l'utilisateur connecté
 * @param {String} uid Identifiant de l'utilisateur connecté
 * @param {String} tid Identifiant de la tâche à faire basculer d'état
 * @param {Boolean} etatActuel Valeur actuelle de l'état de la tâche
 * @returns {Promise<void>} Promesse JS sans valeur (vide)
 */
export async function modifier(uid, tid, etatActuel) {
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .doc(tid).update({completee:!etatActuel});
}

/**
 * 
 * Supprime une tâche dans Firestore pour l'utilisateur connecté
 * @param {String} uid Identifiant de l'utilisateur connecté
 * @param {String} tid Identifiant de la tâche à faire basculer d'état
 * @returns {Promise<void>} Promesse JS sans valeur (vide)
 */
export async function supprimer(uid, tid) {
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .doc(tid).delete();
}

export async function supprimerCompletees(uid)
{
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
   .where('completee', '==', 'true').delete();
}