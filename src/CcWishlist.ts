import {
  Component,
  IComponentBindings,
  ComponentOptions,
  IPreprocessResultsEventArgs,
} from "coveo-search-ui";
import { lazyComponent } from "@coveops/turbo-core";

export interface ICcWishlistOptions {}

@lazyComponent
export class CcWishlist extends Component {
  static ID = "CcWishlist";
  static options: ICcWishlistOptions = {};

  constructor(
    public element: HTMLElement,
    public options: ICcWishlistOptions,
    public bindings: IComponentBindings
  ) {
    super(element, CcWishlist.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(
      element,
      CcWishlist,
      options
    );
    this.bind.onRootElement(
      Coveo.ResultListEvents.newResultsDisplayed,
      this.handleNewResultsDisplayed
    );
  }

  private handleNewResultsDisplayed() {
    try {
      // TODO::LGCARRIER
      // We could pass this function as an option: CCRZ.views.wishlistPickerModal
      let pickerView = _.isUndefined(CCRZ.views.wishlistPickerModal)
        ? false
        : new CCRZ.views.wishlistPickerModal();
    } catch (error) {
      console.warn(
        `CCRZ object was expected to be found but it wasn't.
        Either you are outside of Salesforce B2B CloudCraze or something is not configured properly in your VF pages and/or VF components.`
      );
    }
  }
}
