export const intentPrompt = `
  Classify the user's intent based on the following categories:
  - PRODUCT_INQUIRY: Questions about specific parts or products
  - COMPATIBILITY_CHECK: Inquiries about part compatibility with specific models
  - INSTALLATION_HELP: Questions about installing parts
  - TROUBLESHOOTING: Describing issues or symptoms related to appliances
  - PART_REPLACEMENT: Questions about replacing parts
  - BRAND_INQUIRY: Questions about specific brands or manufacturers
  - SMALL_TALK: Greetings, casual conversation, or off-topic queries

  Examples:
  User: How can I install part number PS11752778?
  Intent: INSTALLATION_HELP

  User: Is this part compatible with my WDT780SAEM1 model?
  Intent: COMPATIBILITY_CHECK

  User: The ice maker on my Whirlpool fridge is not working. How can I fix it?
  Intent: TROUBLESHOOTING

  Classify the following user message:
  User: {userMessage}
  Intent:`;