import {
  Component,
  IComponentBindings,
  ComponentOptions,
  IQueryResult,
  IFieldOption,
  $$,
} from "coveo-search-ui";
import { lazyComponent } from "@coveops/turbo-core";

export interface ICcWishlistButtonOptions {
  skuField?: IFieldOption;
  isVisibleField?: IFieldOption;
}

@lazyComponent
export class CcWishlistButton extends Component {
  static ID = "CcWishlistButton";
  static options: ICcWishlistButtonOptions = {
    skuField: ComponentOptions.buildFieldOption({ defaultValue: '@sfccrz__sku__c' }),
    isVisibleField: ComponentOptions.buildFieldOption({ defaultValue: '@isaddtocartshow' })
  };

  constructor(
    public element: HTMLElement,
    public options: ICcWishlistButtonOptions,
    public bindings: IComponentBindings,
    public result: IQueryResult
  ) {
    super(element, CcWishlistButton.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(
      element,
      CcWishlistButton,
      options
    );

    this.build();
  }

  build() {
    if (Coveo.Utils.getFieldValue(this.result, this.options.isVisibleField as string)) {
      this.element.appendChild(this.buildWishlistButton());
    }
  }

  private getSkuValue(): String {
    return Coveo.Utils.getFieldValue(this.result, this.options.skuField as string);
  }

  private buildWishlistButton(): HTMLElement {

    const ccWishlistButtonContainer = $$(
      "div",
      {
        className: "cc_wishlist",
      },
      $$(
        "div",
        {
          className: "wishFinder",
          "data-sku": this.getSkuValue(),
        },
        $$("div", {
          className: "wishButtons",
        })
      )
    );
    return ccWishlistButtonContainer.el;
  }
}
