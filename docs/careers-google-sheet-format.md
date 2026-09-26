# AGGC Careers — Google Sheet မှာ Post ရေးနည်း

ဤလမ်းညွှန်သည် လက်ရှိ `careers.html` က ဖတ်နိုင်သော format ကို အခြေခံထားသည်။ Markdown အားလုံးကို support လုပ်ခြင်းမဟုတ်ပါ။ Website ဖိုင်အမည်အမှန်မှာ `careers.html` ဖြစ်သည်။

## 1. Google Sheet column များ

အလုပ်ခေါ်စာ post တစ်ခု = Sheet row တစ်ကြောင်း။ Website က column နေရာအလိုက် ဖတ်သောကြောင့် column များ မရွှေ့ပါနှင့်။

| Column | ထည့်ရမည့်အရာ | နမူနာ |
| --- | --- | --- |
| A–C | လက်ရှိအတိုင်းထားပါ။ Careers post display အတွက် မဖတ်ပါ။ | — |
| D | Post ခေါင်းစဉ် — အပေါ်ဆုံး title ကြီး | JOIN OUR FINANCIAL EXCELLENCE TEAM |
| E | အများပြည်သူ ကြည့်နိုင်သော poster image URL | Website ပေါ်မှ ပုံဖိုင်လင့်ခ် |
| F | အောက်တွင်ပြထားသော format ဖြင့် အသေးစိတ်စာသားအားလုံး | ရာထူး၊ အကြောင်းအရာ၊ တာဝန်၊ လိုအပ်ချက် |

- D မှာ `###` မထည့်ပါနှင့်။ Title ကို website က အလိုအလျောက် style ပေးသည်။
- D ဗလာဖြစ်လျှင် ထို row ကို မပြပါ။ E ဗလာဖြစ်လျှင် fallback poster၊ F ဗလာဖြစ်လျှင် “No details provided.” ပေါ်မည်။
- E သည် ပုံဖိုင်ကို တိုက်ရိုက်ဖွင့်နိုင်သော URL ဖြစ်သင့်သည်။ ကိုယ့်စက်ထဲက file path မသုံးပါနှင့်။
- F ထဲက စာကြောင်းအားလုံးကို **cell တစ်ခုတည်း** ထဲ ထည့်ပါ။ Cell ကို double-click လုပ်ပြီး edit mode ထဲမှာ multiline စာသား paste လုပ်ပါ။ Paste ပြီး အခြား row/column များသို့ မပြန့်သွားကြောင်း စစ်ပါ။
- စာကြောင်းအသစ်သည် တကယ့် line break ဖြစ်ရမည်။ `\n` ဟု စာလုံးအဖြစ် မရေးပါနှင့်။

## 2. အသုံးပြုရမည့် အမှတ်အသားများ

| ရေးနည်း | Website တွင် ပေါ်မည့်ပုံစံ |
| --- | --- |
| `### Operations General Manager` | Navy bold ရာထူးခေါင်းစဉ် + အောက်မှာ gold မျဉ်း |
| `#### Job Description` | Bold ခေါင်းစဉ်ငယ် |
| `#### Requirements` | Bold ခေါင်းစဉ်ငယ် |
| `- Oversee daily operations.` | အစိမ်းရောင် check-circle ပါသော bullet item |
| `---` | အပိုင်းခြား horizontal line |
| အမှတ်အသားမပါသောစာသား | ပုံမှန်စာပိုဒ် |
| စာကြောင်းအလွတ်တစ်ကြောင်း | စာပိုဒ်/အပိုင်းအသစ် ခွဲခြင်း |

အရေးကြီးသော ရေးနည်းများ:

- `###`၊ `####`၊ `-` နောက်တွင် **space တစ်ချက်** ထည့်ပါ။
- အမှတ်အသားများကို စာကြောင်းအစမှာ ရေးပါ။ ရှေ့တွင် space မထည့်ပါနှင့်။
- Heading နောက်တွင် စာကြောင်းအလွတ်တစ်ကြောင်းထားပြီးမှ စာပိုဒ်စရေးပါ။ မထားလျှင် screenshot ထဲကလို ရာထူးခေါင်းစဉ်နဲ့ စာပိုဒ် တစ်တန်းတည်း ဆက်ပေါ်နိုင်သည်။
- Bullet တစ်ခုစီကို စာကြောင်းတစ်ကြောင်းစီရေးပါ။ Bullet များကြား blank line မလိုပါ။
- အပိုင်းနှစ်ခုကြား blank line ထားပါ။ `---` ကိုလည်း သူ့တစ်ကြောင်းတည်းရေးပြီး အပေါ်အောက် blank line ထားပါ။
- Check icon၊ အရောင်နှင့် font size ကို Sheet မှာ ထည့်စရာမလိုပါ။ Website က style ပေးသည်။

## 3. F cell ထဲ ကူးထည့်နိုင်သည့် နမူနာ

အောက်ပါ code block ထဲက စာသားကိုသာ ကူးပါ။ အပြင်ဘက် backtick သုံးခုကို မကူးပါနှင့်။ ဤသည်မှာ format နမူနာသာဖြစ်ပြီး အမှန်တကယ်အလုပ်ခေါ်စာအချက်အလက်ဖြင့် ပြောင်းရေးပါ။

```text
### Operations General Manager

The Operations General Manager is responsible for overseeing the day-to-day operations of the company, ensuring efficiency, productivity, compliance and profitability. This role requires strong leadership, strategic thinking and the ability to manage cross-functional teams to achieve business goals.

#### Job Description

- Oversee day-to-day business operations across assigned sectors.
- Develop, implement and monitor effective operational strategies.
- Ensure operational efficiency, productivity and quality standards.
- Lead, motivate and manage cross-functional teams.

#### Requirements

- Bachelor's degree in Engineering, Business Management or a related field.
- Proven experience in senior management or operational leadership roles.
- Strong leadership, problem-solving and decision-making skills.
- Excellent communication, interpersonal and negotiation skills.

---

### Service General Manager

The Service General Manager is responsible for managing and optimizing the company's service operations.

#### Job Description

- Manage daily service operations and coordinate the service team.
- Monitor service quality and customer satisfaction.

#### Requirements

- Relevant qualifications and experience in service management.
- Strong communication and team leadership skills.
```

Post တစ်ခုမှာ ရာထူးတစ်ခုတည်းဆိုလျှင် `---` နှင့် ဒုတိယရာထူးအပိုင်းကို မထည့်ပါနှင့်။ ရာထူးများစွာကို row တစ်ခုထဲရေးနိုင်သော်လည်း လက်ရှိ Apply form ရဲ့ Position field က D column ရှိ post title ကို ဖြည့်ပေးသည်။ ရာထူးတစ်ခုချင်းစီ သီးခြားလျှောက်စေလိုလျှင် Sheet row တစ်ကြောင်းစီ ခွဲတင်ပြီး D မှာ ရာထူးအမည် ထည့်ပါ။

## 4. လက်ရှိ မသုံးသင့်သော Markdown format များ

အောက်ပါတို့ကို လက်ရှိ parser က သီးခြား format အဖြစ် မပြောင်းပေးပါ:

- `# Heading`၊ `## Heading`
- `**bold**`၊ `*italic*`
- `1. Numbered item`
- `* Bullet`၊ nested bullets
- Markdown tables၊ `[label](URL)`၊ `![image](URL)`

စာပိုဒ်အတွင်း bold လိုလျှင် `**...**` ကို အားမကိုးပါနှင့်။ Heading အတွက် support လုပ်ထားသော `###` သို့မဟုတ် `####` ကို သုံးပါ။ Raw HTML / script မထည့်ဘဲ အထက်ပါ plain-text format ကိုသာ သုံးပါ။

## 5. ChatGPT ကို အလုပ်ခေါ်စာရေးခိုင်းရန် Prompt

```text
AGGC website ရဲ့ Careers Google Sheet အတွက် အလုပ်ခေါ်စာရေးပေးပါ။

Output ကို အပိုင်းနှစ်ခုခွဲပေးပါ:
1. D column အတွက် post title — plain text တစ်ကြောင်း။
2. F column အတွက် ကူးထည့်နိုင်သည့် plain-text code block တစ်ခု။

F column format:
### [Job Title]

[Role summary paragraph]

#### Job Description

- [Responsibility]
- [Responsibility]

#### Requirements

- [Requirement]
- [Requirement]

ရာထူးတစ်ခုထက်ပိုပါက အပိုင်းများကြား --- ကို သီးခြားတစ်ကြောင်းထည့်ပြီး အပေါ်အောက် blank line ထားပါ။

###, ####, - တို့နောက်မှာ space တစ်ချက်ထည့်ပါ။ Heading နဲ့စာပိုဒ်ကြား blank line ထားပါ။ **bold**၊ numbered list၊ tables၊ HTML မသုံးပါနှင့်။ ကုမ္ပဏီအမည်ကို AGGC ဟုသာသုံးပါ။ ပေးမထားသော qualifications၊ benefits၊ salary၊ contacts တို့ကို မတီထွင်ပါနှင့်။

အလုပ်ခေါ်စာအချက်အလက်များ:
[ဒီနေရာမှာ ကိုယ့်အချက်အလက်တွေ ဖြည့်ပါ]
```

## 6. တင်ပြီး စစ်ဆေးရန်

1. Sheet မှာ data သိမ်းပြီး `careers.html` ကို refresh လုပ်ပါ။
2. Post ကို ဖွင့်ပြီး title၊ role headings၊ check-list နှင့် section divider ကို စစ်ပါ။
3. Heading နဲ့စာပိုဒ် ဆက်နေပါက F cell ထဲ heading နောက်မှာ blank line ရှိမရှိ စစ်ပါ။
4. Phone layout မှာလည်း စာသားနှင့် poster ကို စစ်ပါ။

ဤဖိုင်သည် လက်ရှိ website code ကိုဖတ်ပြီး ရေးထားသော လမ်းညွှန်ဖြစ်သည်။ Google Sheet data သို့မဟုတ် website rendering code ကို ဤလမ်းညွှန်ရေးသည့်အခါ ပြောင်းထားခြင်းမရှိပါ။
