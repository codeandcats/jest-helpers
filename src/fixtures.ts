export function functionA() {
  // A function defined using `function` keyword will have a name property
}

export const functionB = () => {
  // A fat-arrow function defined using `const` keyword will not have a name property
};

export class PortalGun {
  /**
   * Id of the dimension to open a portal to
   */
  dimensionId: string = 'C-137';

  /**
   * Opens a portal to another dimension matching the id specified in dimensionId
   */
  fire(): void {
    // tslint:disable-next-line:no-console
    console.log(`Portal opened to ${this.dimensionId}`);
  }
}
