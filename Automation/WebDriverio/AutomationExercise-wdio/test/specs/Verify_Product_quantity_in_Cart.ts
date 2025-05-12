describe('Verify Product quantity in Cart', () => {
    it('add more than one item to the product ', async() => {
        await browser.url('https://automationexercise.com/');
        await expect(browser).toHaveUrl('https://automationexercise.com/');
        const viewProductBtn = await $('.choose>ul>li>a[href="/product_details/1"]');
        await viewProductBtn.click();
        const productInformation = await $('.product-information');
        await expect(productInformation).toBeDisplayed();
        const setQuantity = await $('#quantity');
        await setQuantity.setValue(4);
        const addProductBtn = await $('.product-information>span>button');
        await addProductBtn.click();
        (await $('.modal-content')).waitForExist({timeout:3000});
        const viewCartBtn = await $('.modal-body>.text-center>a[href="/view_cart"]');
        await viewCartBtn.click();
        const getQuantity = (await $('.cart_quantity>.disabled')).getText();
        console.log(getQuantity);
        
        



    });
    
});