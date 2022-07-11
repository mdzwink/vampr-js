class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.creator = null;
    this.offspring = [];
    this.yearConverted = yearConverted;
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
      numFromOrig += 1;
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


  vampireWithName(name) {
    let foundVamp = null
    if (this.name === name) {
      foundVamp = this;
    }
    for (let vamp of this.offspring) {
      let possibleMatch = vamp.vampireWithName(name);
      if (possibleMatch) {
        foundVamp = possibleMatch;
      }
    }
    return foundVamp;
  }
  
  get totalDescendents() {
    let vampCount = 0;
    for (let vamp of this.offspring) {
      vampCount += 1;
      let count = vamp.totalDescendents;
      vampCount += count;
    }
    return vampCount;
  }

  get allMillennialVampires() {
    let millennialVamps = [];
    if (this.yearConverted > 1980) {
      millennialVamps.push(this);
    }
    for (let vamp of this.offspring) {
      let possibleMillennial = vamp.allMillennialVampires;
      if (possibleMillennial) {
        millennialVamps = [...millennialVamps, ...possibleMillennial];
      }
    }
    return millennialVamps;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {
  //   for (let ancestor of this) {
  //     for (let ancestor2 of vampire) {
  //       if (ancestor === ancestor2) {
  //         return ancestor;
  //       }
  //     }
  //   }
  // }
}




module.exports = Vampire;

