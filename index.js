// Lib
const LowBot = require('./../lowbot/src/index');

// Classifiers
const IntentClassification = require('eduir');
// const DesireClassification = require('intent-desire');
const DesireClassification = require('./../../recognisers/intent-desire/src/index');

// Adapters
const alexa = require('lowbot-alexa');
const discord = require('lowbot-discord');
const slack = require('lowbot-slack');
const terminal = require('lowbot-terminal');

// Skills
const intents = require('./build/intents.json').intents;
const BasicSkill = require('./../../skillsets/basic-skill/src/index');
// const BasicSkill = require('basic-skillset');
const StoreSkill = require('./../../skillsets/store-skillset/src/index');
// const BasicSkill = require('basic-skillset');

// Personalities
const chars = require('./chars.json');

// Payment providers
const iou = require('./../../payment/iou-pp/src/index');

/**
  * Bot instance
  */
let botInstance = new LowBot(intents)
  /**
    * Classifiers
    */
  // .applyClassifier(IntentClassification, intents)
  .applyDesireClassifier(DesireClassification)
  .applyIntentClassifier(IntentClassification)
  /**
    * Adapters
    */
  // .useAdapter(alexa)
  .useAdapter(discord)
  // .useAdapter(slack)
  // .useAdapter(terminal)
  /**
    * Skills
    */
  .addSkill(BasicSkill) // Basic skill
  .addSkill(StoreSkill) // Store skill
  /**
    * Services
    */
  .enableDataService() // Allow skills to use the data service specified in .env
  .enablePodService() // Allow skills to use the pod service specified in .env
  /**
    * Personality
    */
  .personaInherit('Bot', chars, false, true) // Set persona as default personality if not set, inherit persona from last set, allow persona switching
  /**
    * Payment providers
    */
  .addPaymentProvider(iou)
  /**
    * Build and launch
    */
  .build(false).then((bot) => { // Automatically build if needed when bot script executed
    bot.init(); // Initialise bot instance (wake up)
  });
