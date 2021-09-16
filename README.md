# CopyTextToClipboardGallery PCF Component

First and foremost, I want to give credit to @TBag for developing the foundation which made this PCF component possible. Please ensure you head over to https://github.com/TBag/power-apps-copy-text-to-clipboard and view his in-depth readme. 

#How does this differ from the aforementioned Component

One of the limitations with PCF in general is the fact that code components cannot be embedded into galleries. Therefore, it can be difficult interact with gallery data using a code component. The copy to clipboard function is a very sought-after feature that is currently under investigation (vote for it here - https://powerusers.microsoft.com/t5/Power-Apps-Ideas/Copy-to-Clipboard/idi-p/32975). 

I needed a way to get data each individual gallery item and copy that to my clipboard. That is where this simple component comes in. 

#How does it work

The component is a single text box element which has a single property, "Value" associated with it. This value is accessible from within the PowerApps Editor:
![image](https://user-images.githubusercontent.com/1781212/133541899-fe497ea9-9cfd-461c-8f6e-f7067a525145.png)

Intrerestingly, any time a property value changes, the 'updateView' function is called. In here, we pass the components current property value to the function 'onValuePropertyChange'. This function then calls the clipboard library referenced in TBag's Readme file. 

In order for this to work for galleries, we will use the galleries "mygallery.selected" function and put that into the components "Value" property. 
