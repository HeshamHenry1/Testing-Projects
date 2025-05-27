import { test, expect } from '@playwright/test';
import { UpdateProfilePage } from './pages/UpdateProfilePage';

test.describe('Update Profile Data Tests', () => {
  let updateProfilePage: UpdateProfilePage;

  test.beforeEach(async ({ page }) => {
    updateProfilePage = new UpdateProfilePage(page);
    await test.step('Step 1: Navigate to Update Profile page', async () => {
      await updateProfilePage.goto();
    });
  });

  test('Update profile with valid information in First Name', async () => {
    await test.step('Step 1: Fill First Name with valid data', async () => {
      await updateProfilePage.fillFirstName('test_4');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify profile updated message', async () => {
      await updateProfilePage.expectProfileUpdated();
    });
  });

  test('Update profile with valid information in all fields', async () => {
    await test.step('Step 1: Fill First Name', async () => {
      await updateProfilePage.fillFirstName('test1');
    });
    await test.step('Step 2: Fill Last Name', async () => {
      await updateProfilePage.fillLastName('test2');
    });
    await test.step('Step 3: Fill Street', async () => {
      await updateProfilePage.fillStreet('test123');
    });
    await test.step('Step 4: Fill City', async () => {
      await updateProfilePage.fillCity('test city');
    });
    await test.step('Step 5: Fill State', async () => {
      await updateProfilePage.fillState('test ca');
    });
    await test.step('Step 6: Fill Zip Code', async () => {
      await updateProfilePage.fillZipCode('000');
    });
    await test.step('Step 7: Fill Phone Number', async () => {
      await updateProfilePage.fillPhoneNumber('000-000-0000');
    });
    await test.step('Step 8: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 9: Verify profile updated message', async () => {
      await updateProfilePage.expectProfileUpdated();
    });
  });

  test('Update profile with invalid phone number', async () => {
    await test.step('Step 1: Fill Phone Number with invalid data', async () => {
      await updateProfilePage.fillPhoneNumber('invalidPhoneNumber');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify error message for invalid phone number', async () => {
      await updateProfilePage.expectErrorMessage('Please enter a valid phone number');
    });
  });

  test('Update profile with invalid zip code', async () => {
    await test.step('Step 1: Fill Zip Code with invalid data', async () => {
      await updateProfilePage.fillZipCode('invalidZip');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify error message for invalid zip code', async () => {
      await updateProfilePage.expectErrorMessage('Please enter a valid zip code');
    });
  });

  test('Update profile with empty first name', async () => {
    await test.step('Step 1: Clear First Name field', async () => {
      await updateProfilePage.fillFirstName('');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify error message for empty First Name', async () => {
      await updateProfilePage.expectErrorMessage('First Name is required');
    });
  });

  test('Update profile with empty last name', async () => {
    await test.step('Step 1: Clear Last Name field', async () => {
      await updateProfilePage.fillLastName('');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify error message for empty Last Name', async () => {
      await updateProfilePage.expectErrorMessage('Last Name is required');
    });
  });

  test('Update profile with incomplete address', async () => {
    await test.step('Step 1: Clear Street field', async () => {
      await updateProfilePage.fillStreet('');
    });
    await test.step('Step 2: Clear City field', async () => {
      await updateProfilePage.fillCity('');
    });
    await test.step('Step 3: Clear State field', async () => {
      await updateProfilePage.fillState('');
    });
    await test.step('Step 4: Clear Zip Code field', async () => {
      await updateProfilePage.fillZipCode('');
    });
    await test.step('Step 5: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 6: Verify error message for empty address fields', async () => {
      await updateProfilePage.expectErrorMessage('Address fields cannot be empty');
    });
  });

  test('Update profile with valid first name and special characters in last name', async () => {
    await test.step('Step 1: Fill First Name with valid data', async () => {
      await updateProfilePage.fillFirstName('testFirst');
    });
    await test.step('Step 2: Fill Last Name with invalid characters', async () => {
      await updateProfilePage.fillLastName('!@#$%');
    });
    await test.step('Step 3: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 4: Verify error message for invalid characters in Last Name', async () => {
      await updateProfilePage.expectErrorMessage('Last Name contains invalid characters');
    });
  });

  test('Update profile with a valid phone number in the wrong format', async () => {
    await test.step('Step 1: Fill Phone Number with wrong format', async () => {
      await updateProfilePage.fillPhoneNumber('12345');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify error message for invalid phone number format', async () => {
      await updateProfilePage.expectErrorMessage('Please enter a valid phone number format (e.g., 123-456-7890)');
    });
  });

  test('Update profile with valid information and check for changes', async () => {
    await test.step('Step 1: Fill First Name with valid data', async () => {
      await updateProfilePage.fillFirstName('updatedFirstName');
    });
    await test.step('Step 2: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 3: Verify profile updated message', async () => {
      await updateProfilePage.expectProfileUpdated();
    });
    await test.step('Step 4: Verify First Name value is updated', async () => {
      const updatedFirstName = await updateProfilePage.getFirstNameValue();
      expect(updatedFirstName).toBe('updatedFirstName');
    });
  });

  test('Update profile with all fields cleared', async () => {
    await test.step('Step 1: Clear First Name field', async () => {
      await updateProfilePage.fillFirstName('');
    });
    await test.step('Step 2: Clear Last Name field', async () => {
      await updateProfilePage.fillLastName('');
    });
    await test.step('Step 3: Clear Street field', async () => {
      await updateProfilePage.fillStreet('');
    });
    await test.step('Step 4: Clear City field', async () => {
      await updateProfilePage.fillCity('');
    });
    await test.step('Step 5: Clear State field', async () => {
      await updateProfilePage.fillState('');
    });
    await test.step('Step 6: Clear Zip Code field', async () => {
      await updateProfilePage.fillZipCode('');
    });
    await test.step('Step 7: Clear Phone Number field', async () => {
      await updateProfilePage.fillPhoneNumber('');
    });
    await test.step('Step 8: Click Update button', async () => {
      await updateProfilePage.clickUpdate();
    });
    await test.step('Step 9: Verify error message for all fields required', async () => {
      await updateProfilePage.expectErrorMessage('All fields are required');
    });
  });
});
