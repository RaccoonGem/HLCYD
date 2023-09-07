# HLCYD
How Long Can You Dodge is a game where you dodge bullets. That's all there is to it!

The "objects" in the game world have their own properties, such as x and y coordinates, current action being taken, etc.
Many of these properties are inherited via prototypal inheritance, with GamePiece being the origin of any "physical" properties that all objects in the game world need to have.
The object "game" contains properties relating to the state of the game itself, such as how much time has passed, an array of all currently-existing game pieces objects, etc.
It also contains helper functions that different places might need.

Attack patterns and movement behaviors for the enemy in each level are kept in the "patterns" folder.
Attacks are structured like so:

let attacks = [     // The array of all attacks for one level, to be exported
  [                   // Beginning of Attack 1
    {                   // Beginning of Action 1 of Attack 1
      moves: () => {      // Beginning of Action 1's moves function, which contains all of the code to be executed as the attack.
        doAThing();         // An instruction to be carried out. Could be firing a bullet, setting a variable, etc.
        ...                 // More instructions. Note that these will all occur on the same frame.
      },                  // End of Action 1's moves fucntion
      cd: int             // "Cooldown" of Action 1 (how many frames pass before the next Action (or Attack, if on last Action) occurs)
    },                  // End of Action 1 of Attack 1
    ...                 // More Action objects, with their own moves and cd properties
  ],                  // End of Attack 1
  ...                 // More Attacks, with their own Action objects
];