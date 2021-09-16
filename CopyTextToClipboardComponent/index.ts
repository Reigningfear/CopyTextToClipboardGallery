/* eslint-disable space-before-blocks */
/* eslint-disable block-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
import { IInputs, IOutputs } from './generated/ManifestTypes'
import * as copy from 'copy-to-clipboard'

export class CopyTextToClipboardComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  // Value of the field is stored and used inside the control
	private _value: string;

	// PCF framework delegate which will be assigned to this object which would be called whenever any update happens.
	private _notifyOutputChanged: () => void;

	// input/textarea element created as part of this control
	private textInput: any;

	// button element created as part of this control
	private button: HTMLButtonElement;

	// Reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;

	private _rootContainer: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor () {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init (context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// get root container before child controls are appended
		this._rootContainer = this.getRootContainer(container)!

		// Adding the textInput and button created to the container DIV.
		this._container = document.createElement('div')
		//generate textinput
		this.textInput = document.createElement('input')
		this.textInput.setAttribute('type', 'text')
		this.textInput.setAttribute('id', 'textinputtocopy')
		//hide text box
		this.textInput.style.display = "none"
		this._container.appendChild(this.textInput)
		this._notifyOutputChanged = notifyOutputChanged
		container.appendChild(this._container)
	}

	/**
		 * Button Event handler for the button created as part of this control
		 * @param event
		 */
	private onValuePropertyChange (TextToCopy: any): void {
	
	  copy(TextToCopy.toString())
	}

	/**
	 * Get root container which has height set before the child nodes are appended
	*/
	private getRootContainer (container: HTMLDivElement) {
	  let node : HTMLDivElement | null = container

	  // lookup the first parent node which has a height set
	  while (node && !node.style.height) {
	    node = node.parentNode as HTMLDivElement | null
	  }

	  return node
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView (context: ComponentFramework.Context<IInputs>): void {
		
		// Add code to update control view
		this._value = context.parameters.Value.raw!

		const textboxelement = document.getElementById('textinputtocopy')

		if(textboxelement !== null){textboxelement.innerHTML = this._value}

		this.onValuePropertyChange(this._value)
		//const tempValue = this._value != null ? this._value.toString() : ''
		//this.textInput.value = tempValue
		// refresh input size
		this.textInput.style.height = this._rootContainer.style.height
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
	 */
	public getOutputs (): IOutputs {
	  // custom code goes here - remove the line below and return the correct output
	  const result: IOutputs = {
	    Value: this._value
	  }
	  return result
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy (): void {
	  // Add code to cleanup control if necessary
	}
}
