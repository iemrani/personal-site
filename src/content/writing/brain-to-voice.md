---
title: He had to mime the words before he could think them
date: 2026-09-20
summary: >-
  Neuralink posted a video of a man speaking in his own voice through a brain
  implant, and explained the method in one sentence. Here is what is actually
  happening: two separately trained models, and a training order that is the
  reason the whole thing works.
---

On 18 September 2026, Neuralink posted a video of a man called Terry saying "I love you"
in his own voice. Terry cannot speak. The voice came out of a speaker, assembled from
signals recorded inside his head.

The post explains how he got there in one sentence, and then moves on:

> He trained the algorithm first by miming speech as best he could, then by simply
> thinking the words.

That order is not a detail. It is the whole reason this works. Training first on mimed
speech and only then on imagined speech is the single decision that makes the system
learnable, and nobody explaining this video has said why.

Here is what is actually happening. There are two models, not one, and the interesting
problem is not the implant.

---

## 01. It is not reading his mind. It is reading his mouth.

![Where the implant listens](/writing/brain-to-voice/fig-01-speech-chain.png)
*Figure 1. The tap sits downstream of intention, which is why this recovers attempted speech and not thought. Electrode count: Neuralink N1 published specification. Cortical target after Card et al., NEJM, 15 Aug 2024 (left precentral gyrus, 256 electrodes).*

The electrodes do not sit near anything that stores meaning. They sit on the strip of
cortex that drives the mouth, tongue, jaw and larynx.

When you speak, that region issues motor commands. In ALS, the commands are still issued
and the muscles no longer obey them. The implant intercepts the instruction, not the
thought behind it.

This matters because it sets the ceiling on what the technology can ever do. A system
wired to motor cortex can recover speech you are trying to produce. It cannot read a
belief, a memory or an intention you are not in the act of saying.

The best published example used 256 electrodes across four arrays, in the left precentral
gyrus. Neuralink's N1 carries 1,024 electrodes on 64 threads, each thinner than a hair, in
a housing about the size of a coin.

Four times the electrodes. Same target.

---

## 02. Two models, not one

![Two models, not one](/writing/brain-to-voice/fig-02-two-models.png)
*Figure 2. Two models, two training sets, and plain text as the handoff between them. Decoder figures: Card et al., NEJM, 15 Aug 2024. Electrode count: Neuralink N1. Voice model per Neuralink's post of 18 Sep 2026.*

Terry's voice is the output of two separate systems, trained on two separate datasets,
with a handoff in the middle.

**Model A turns brain signals into text.** Its training data is his own cortical activity,
recorded while he tried to produce known sentences. It is specific to him and to the
position of his electrodes. It would not transfer to another person.

**Model B turns text into his voice.** Its training data is audio of him speaking, recorded
before the disease took his speech. Neuralink credits Grok Voice for this half. It is a
voice clone, and it is the reason the output sounds like Terry rather than like a
satnav.

The handoff between them is plain text.

That separation is why the result is emotionally effective. The hard engineering is in
model A. The thing that makes his family cry is model B.

---

## 03. The decoder does not guess words. It guesses sounds.

![Sounds first, words later](/writing/brain-to-voice/fig-03-phonemes.png)
*Figure 3. One sound every 80 ms, from about forty classes. Language models assemble the sentence. Why it matters: 213 sentences over 30 minutes were enough to reach 99.6% on a 50-word vocabulary. A further 260 sentences over 1.4 hours opened the system to 125,000 words at 90.2%. A model asked to learn 125,000 word classes from one person's speech attempts would never see enough of each. Source: Card et al., "An Accurate and Rapidly Calibrating Speech Neuroprosthesis", NEJM, 15 Aug 2024. Sounds shown as plain-English respellings, not IPA.*

Model A never tries to output a word. It outputs a phoneme, one of the roughly forty
sound units of English, and in the best documented system it does so **once every 80
milliseconds**.

Three language models then sit on top, turning that stream of sounds into the most likely
English sentence.

This is the load-bearing design choice, and it is a plain data problem. A vocabulary of
125,000 words gives you 125,000 classes to learn, and one man producing training sentences
for half an hour will never give you enough examples of each. Forty classes he can cover
in minutes.

The numbers from that system are worth reading twice. **213 sentences, recorded over 30
minutes, produced 99.6% accuracy on a 50-word vocabulary.** A further 260 sentences over
1.4 hours opened it up to 125,000 words at 90.2%. With more data it settled at 97.5% and
held there for eight months, at about 32 words a minute.

Half an hour of data. Because the model was asked to learn sounds, not words.

---

## 04. Why he mimed first, and thought second

![Why mime before thinking](/writing/brain-to-voice/fig-04-inner-speech.png)
*Figure 4. Inner speech sits inside attempted speech: the same pattern, quieter. That is why training transfers. Containment finding: Kunz et al., "Inner speech in motor cortex and implications for speech neuroprostheses", Cell, 14 Aug 2025, four participants. Curriculum order as described by Neuralink for the VOICE trial, 18 Sep 2026. Neuralink has published no peer-reviewed account of its own decoder.*

Now the part the video skips.

Miming and imagining are not the same task for the brain, and a model trained on one has
no guarantee of working on the other. So why train on miming at all?

Because of what a Stanford team published in *Cell* in August 2025, working with four
participants. They found that inner speech, the silent voice in your head, shows up in
motor cortex too. It occupies **the same neural pattern as attempted speech, at lower
amplitude.** Quieter, not different.

That single finding is what makes the curriculum work. Mimed speech produces a strong,
clean signal and unambiguous labels, because the person is visibly trying. Imagined speech
produces a faint version of the same pattern. So a model taught on the loud version
already knows most of what it needs for the quiet one.

You train where the signal is strong, then move to where the signal is useful. Terry did
not mime because miming was the goal. He mimed because it was the only way to teach the
model what his silence would later look like.

---

## 05. What it cannot do

![The cost of only thinking](/writing/brain-to-voice/fig-05-accuracy.png)
*Figure 5. Word accuracy across four conditions. Thinking instead of trying costs real accuracy. Read the last bar against the third, not the first. The three attempted bars are one participant at UC Davis (Card et al., NEJM, 15 Aug 2024); the imagined bar is a different study, four participants at Stanford (Kunz et al., Cell, 14 Aug 2025). Different people and implants, so treat the gap as indicative, not measured head to head.*

**It needs you to try.** Inner speech is quieter, and accuracy drops with it: the Stanford
system read imagined sentences from a 125,000-word vocabulary at 74%, against 97.5% for
attempted speech in the UC Davis work. Thinking is easier for the user and harder for the
model.

**Private thought leaks.** The same team found inner speech showing up when participants
were not trying to communicate at all. Their fix is worth knowing: a mental password.
The decoder stays shut until the participant thinks "chitty chitty bang bang", which it
detected with 98.75% accuracy. The privacy problem in these systems is real enough that
researchers are already building locks.

**The evidence base is tiny.** The results above come from a handful of participants. One
man, eight months, is a result. It is not a population.

**And Neuralink has published none of this.** Their speech trial is registered as VOICE
(NCT07224256) and the devices are investigational, not approved. Everything in this article
about how the decoding works comes from other groups who published their methods. When you
watch Terry's video, you are watching a demonstration, not a paper.

---

## Six questions, answered

**Is it mind reading?**
No. It reads the motor commands for speech, from the part of the brain that moves the
mouth. You have to be in the act of trying to say something.

**Is that really his voice?**
It is a clone of it, trained on recordings made before he lost his speech. The brain
implant supplies the words. A separate voice model supplies the sound.

**Why did he mime before thinking?**
Mimed speech gives a strong signal and clear labels. Imagined speech is the same brain
pattern, only fainter. Train on the loud version, then use the quiet one.

**How much training data does it take?**
Less than you would expect. Half an hour of sentences was enough for a small vocabulary in
the best published system, and a couple of hours for a large one. Predicting sounds instead
of words is what buys that.

**How good is it?**
97.5% of words correct, held for eight months, at about 32 words a minute. Normal
conversation runs near 150. It is a real conversation at a slow pace.

**Should I believe the video?**
Believe that it happened. Do not assume the mechanism matches what you have read, including
here, because Neuralink has not published its decoder. The mechanism described in this
article is the one the peer-reviewed work describes.

---

## Endnote: where this comes from, and what is missing

Two peer-reviewed papers carry almost every technical claim above.

The accuracy, calibration and phoneme figures are from Card et al., "An Accurate and
Rapidly Calibrating Speech Neuroprosthesis", *New England Journal of Medicine*, 15 August
2024, a single-participant study in the BrainGate2 trial at UC Davis. Its participant had
ALS and severe dysarthria, and attempted to speak rather than imagining speech. The paper
notes that no microphone input was used for decoding, which answers the most obvious
objection to the whole result.

The inner-speech findings, the 74% figure and the mental password are from Kunz et al.,
"Inner speech in motor cortex and implications for speech neuroprostheses", *Cell*, 14
August 2025, with four participants at Stanford.

Terry's quote and the Grok Voice credit are from Neuralink's post of 18 September 2026. The
N1 electrode count is from Neuralink's own published material.

**What is missing, and it is a lot.** Neuralink has published no peer-reviewed description
of its speech decoder, so the architecture of Terry's specific system is unknown. The UC
Davis paper keeps its network architecture, training objective and language-model details
in a supplementary appendix I could not retrieve, so this article describes what the
decoder outputs and how much data it needed, not how it is built inside. Where I could not
source something, it is not here.

Terry is one person in a trial of a device that is not approved. Read it as a working
demonstration of a hard idea, which is enough.
