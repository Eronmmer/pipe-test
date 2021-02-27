# Table Builder

- **Demo**: https://erons-pipe.netlify.app/

Could you imagine a more interesting way to quickly build customizable views of various database tables? 😃 Well, be my guest.

You select the columns you want to be displayed, filter numeric data and I make sure your data conforms to the rules you specify.

There's no catch: That's simply just it :).

Here's a quick breakdown of what you can do with this pretty little app.

- You can select at least one column to add from the list of available options on the left.

![Columns](/public/columns.jpg)

- You can filter some numeric data: Term Length, MRR and Invoice Number

![Filter](/public/2.jfif)

- You can export your current config/setting as JSON and import it later to continue right from where you stopped!

![Export](/public/export.jpg)
![Import](/public/import.jpg)

## Extras

- You can deselect a column by clicking on it again. As for the last 3 numeric columns, you have to click on the text i.e(MRR, Invoice Number or Term Length) to deselect. Clicking on the filter button will only open a filter modal where you can clear or save a filter.
- During importation, the JSON string is thoroughly validated and parsed to ensure that the right string exported from the app initially was used.
- You can copy the content of the Table Config to the clipboard by just clicking on a button
- You get a 'no match found message' when none of the data in visible columns match your filter

## Tech stack

- React + TypeScript + ChakraUI(UI component library)

## Installation and Local Setup

Run the command `git clone https://github.com/Eronmmer/pipe-test` on your terminal to clone this repo to your current directory.

Run `yarn` or `npm install` to install all required dependencies.

Run `yarn test` or `npm run test` to run tests.

Run `yarn start` to run the project locally.

You're all set 🚀.
