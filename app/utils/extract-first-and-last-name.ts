export function extractFirstAndLastName(fullName: string): { firstName: string; lastName: string } {
    if (fullName === '') {
      return { firstName: '', lastName: '' };
    }
  
    const namesArray = fullName.split(' ');
  
    if (namesArray.length >= 2) {
      const firstName = namesArray[0].trim();
      const lastName = namesArray[namesArray.length - 1].trim();
      return { firstName, lastName };
    } else {
      const firstName = namesArray[0];
      return { firstName, lastName: '' };
    }
  }
  