export const intentPrompt = `
Classify the user's intent based on the following categories:
- PRODUCT_INQUIRY: General or specific questions about products, parts, or their features
- COMPATIBILITY_CHECK: Inquiries about part compatibility with general or specific models
- INSTALLATION_HELP: Questions about installing parts
- TROUBLESHOOTING: Describing issues or symptoms related to appliances
- BRAND_INQUIRY: Questions about general or specific brands or manufacturers
- SMALL_TALK: Greetings, casual conversation, or off-topic queries

Examples:
User: How can I install part number PS11752778?
{
  "intent": "INSTALLATION_HELP",
  "reason": "The user is asking about how to install a specific part"
}

User: Is this part compatible with my WDT780SAEM1 model?
{
  "intent": "COMPATIBILITY_CHECK",
  "reason": "The user is inquiring about part compatibility with a specific model"
}

User: The ice maker on my Whirlpool fridge is not working. How can I fix it?
{
  "intent": "TROUBLESHOOTING",
  "reason": "The user is describing an issue with their appliance and seeking a solution"
}

Classify the following user message and provide the output in JSON format:
User: {{userMessage}}

Output the classification as a complete JSON object with no additional text or formatting:
`;