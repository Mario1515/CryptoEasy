import { validateUrl } from "../../services/userService";

export function validateNftData(name, description, price, imageUrl, type) {
    let errors = [];

    //Validatations
    if (name.toString().length < 3 || name.toString().length > 30) {
        errors.push('Name must be between 3 and 30 characters.')
    }

    if (description.toString().length < 10 || description.toString().length > 100) {
        errors.push('Description must be between 10 and 100 characters.')
    }
    if (Number(price.toString()) <= 0 || isNaN(Number(price))) {
        errors.push('Price must be a positive number.');
    }

    let imageUrlValid = validateUrl(imageUrl);
    if (!imageUrlValid) {
        errors.push('Image URL must be a valid URL.');
    }

    if (!type) {
        errors.push('You must choose a blockchain.');
    }

    return errors;
}