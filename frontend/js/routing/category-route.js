import { Route } from "./route.js";
import { get } from "../requests/requests.js";
import { replaceShimmerContent } from "../utils/dom.js";

export class CategoryRoute extends Route {
    constructor() {
        super('category', '/pages/category.html')
    }

    loadData(params) {
        if (params != null) {
            const parsedParams = JSON.parse(params);
            this.#loadMenu(parsedParams.id);
        } else {
            console.log('Params must not be null and must contain category ID.')
        }
    }

    #loadMenu(categoryId) {
        get('/menu/' + categoryId, this.#fillMenu);
    }

    #fillMenu(cafeItems) {
        replaceShimmerContent(
            '#cafe-category',
            '#cafe-item-template',
            '#cafe-item-image',
            cafeItems,
            (template, cafeItem) => {
                template.attr('id', cafeItem.name);
                template.find('#cafe-item-image').attr('src', cafeItem.image);
                template.find('#cafe-item-name').text(cafeItem.name);
                template.find('#cafe-item-description').text(cafeItem.description);
            }
        )
    }
}