/** @format */

const doc = document;

class EnchantedBeing {
  constructor(name, habitat, magicalQuality) {
    this.name = name;
    this.habitat = habitat;
    this.magicalQuality = magicalQuality;
  }
}

class MythicalCreature extends EnchantedBeing {
  constructor(name, habitat, powerLevel, magicalAbility) {
    super(name, habitat, "Mythical");
    this.powerLevel = powerLevel;
    this.magicalAbility = magicalAbility;
  }
}

class AncientCreature extends EnchantedBeing {
  constructor(name, habitat, strength, size) {
    super(name, habitat, "Ancient");
    this.strength = strength;
    this.size = size;
  }
}

class MysticalEntity extends EnchantedBeing {
  constructor(name, habitat, auraColor, specialAbility) {
    super(name, habitat, "Mystical");
    this.auraColor = auraColor;
    this.specialAbility = specialAbility;
  }
}

function createButton(beingType, clickHandler) {
  const button = doc.createElement("button");
  button.innerText = beingType;
  button.addEventListener("click", clickHandler);
  return button;
}

function createContainer(id) {
  const container = doc.createElement("section");
  container.className = id;
  return container;
}

function createInputField(type, name, placeholder) {
  const input = doc.createElement("input");
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;
  return input;
}

function createFormFields(beingType) {
  const commonFields = [
    createInputField("text", "name", "Name"),
    createInputField("text", "habitat", "Habitat"),
    createInputField("text", "magicalQuality", "Magical Quality"),
  ];

  const specificFields = getSpecificFields(beingType);
  return [...commonFields, ...specificFields];
}

function getSpecificFields(beingType) {
  switch (beingType) {
    case "MythicalCreature":
      return [
        createInputField("number", "powerLevel", "Power Level"),
        createInputField("text", "magicalAbility", "Magical Ability"),
      ];
    case "AncientCreature":
      return [
        createInputField("number", "strength", "Strength"),
        createInputField("number", "size", "Size"),
      ];
    case "MysticalEntity":
      return [
        createInputField("text", "auraColor", "Aura Color"),
        createInputField("text", "specialAbility", "Special Ability"),
      ];
    default:
      return [];
  }
}

function createCardInfo(beingType, getValue) {
  const commonInfo = [
    `<p>Name: ${getValue("name")}</p>`,
    `<p>Habitat: ${getValue("habitat")}</p>`,
    `<p>Magical Quality: ${getValue("magicalQuality")}</p>`,
  ];

  const specificInfo = getSpecificInfo(beingType, getValue);
  return [...commonInfo, ...specificInfo];
}

function getSpecificInfo(beingType, getValue) {
  switch (beingType) {
    case "MythicalCreature":
      const powerLevel = getValue("powerLevel");
      const magicalAbility = getValue("magicalAbility");
      return [
        `<p>Power Level: ${powerLevel}</p>`,
        `<p>Magical Ability: ${magicalAbility}</p>`,
      ];
    case "AncientCreature":
      const strength = getValue("strength");
      const size = getValue("size");
      return [`<p>Strength: ${strength}</p>`, `<p>Size: ${size}</p>`];
    case "MysticalEntity":
      const auraColor = getValue("auraColor");
      const specialAbility = getValue("specialAbility");
      return [
        `<p>Aura Color: ${auraColor}</p>`,
        `<p>Special Ability: ${specialAbility}</p>`,
      ];
    default:
      return [];
  }
}

function clearContainer(container) {
  container.innerHTML = "";
}

function createInputForm(beingType) {
  clearContainer(formContainer);
  const form = doc.createElement("form");
  const formFields = createFormFields(beingType);
  const submitButton = doc.createElement("input");
  submitButton.type = "submit";
  submitButton.id = "submitButton";
  submitButton.value = "Submit";
  formFields.forEach((field) => form.appendChild(field));
  form.appendChild(submitButton);
  formContainer.appendChild(form);
  form.dataset.beingType = beingType;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    createCard(beingType);
  });
}

function createCard(beingType) {
  const form = doc.querySelector("form");
  const getValue = (fieldName) =>
    form.querySelector(`[name="${fieldName}"]`).value;
  const cardInfo = createCardInfo(beingType, getValue);
  const card = doc.createElement("div");
  card.className = "card";

  const cardTitle = doc.createElement("h2");
  cardTitle.innerText = beingType;

  const cardContent = doc.createElement("div");
  cardContent.innerHTML = cardInfo.join("");

  card.appendChild(cardTitle);
  card.appendChild(cardContent);
  cardContainer.appendChild(card);
  clearContainer(formContainer);
}

const buttonHandlers = {
  MythicalCreature: () => createInputForm("MythicalCreature"),
  AncientCreature: () => createInputForm("AncientCreature"),
  MysticalEntity: () => createInputForm("MysticalEntity"),
};

const buttonContainer = createContainer("section-container");
const formContainer = createContainer("section-container");
const cardContainer = createContainer("section-container");
const createMythicalCreatureBtn = createButton(
  "MythicalCreature",
  buttonHandlers.MythicalCreature
);
const createAncientCreatureBtn = createButton(
  "AncientCreature",
  buttonHandlers.AncientCreature
);
const createMysticalEntityBtn = createButton(
  "MysticalEntity",
  buttonHandlers.MysticalEntity
);

buttonContainer.append(
  createMythicalCreatureBtn,
  createAncientCreatureBtn,
  createMysticalEntityBtn
);
doc.body.append(buttonContainer, formContainer, cardContainer);
