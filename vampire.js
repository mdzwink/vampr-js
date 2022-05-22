class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numFromOrig = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numFromOrig++;
    }
    return numFromOrig;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const mySeniority = this.numberOfVampiresFromOriginal;
    const othersSeniority = vampire.numberOfVampiresFromOriginal;
    if (mySeniority < othersSeniority) {
      return true;
    }
    return false;
  }


  //>>>>>
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    while(this.creator) {
      if (this.name === name) {
        return this;
      };
      vampireWithName(name);
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let thisDesc = this;
    let totalDesc = 0;
    while (this.offspring) {
      thisDesc = this.offspring;
      totalDesc++;
    }
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

  }

  //>>>>>>
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    for (let ancestor of this) {
      for (let ancestor2 of vampire) {
        if (ancestor === ancestor2) {
          return ancestor;
        }
      }
    }
  }
}


const andrew = new Vampire('Andrew', 1994);

const sarah = new Vampire('Sarah', 1942);
const elgort = new Vampire('Elgort', 1929);
andrew.addOffspring(andrew);

const ansel = new Vampire('Ansel', 1800);
ansel.addOffspring(sarah);
ansel.addOffspring(elgort);

const bart = new Vampire('Bart', 1600);

const rigi = new Vampire('Rigy (short for Original)', 0);
rigi.addOffspring(ansel);
rigi.addOffspring(bart);




console.log(Vampire.vampireWithName('Ansel'));

module.exports = Vampire;

