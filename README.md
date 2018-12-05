# Lowbot examples
Example implementations of lowbot

# Building intents model
To generate the intents model you will need to install (Rapid intent builder)[https://github.com/Truemedia/rapid-intent-builder]

Once you have that installed run the following command inside your bot directory:

```bash
  rapid-intent-builder --l=src/skills/**/kb/en_GB/*.txt --u=src/skills/**/kb/en_GB/*.utter
```
