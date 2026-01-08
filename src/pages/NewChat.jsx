import { useState } from "react";
import { marked } from "marked";

const initialChatHistory = [
  {
    Hi: "Hello! How can I assist you today? If you have any questions or need help with something, feel free to let me know! 😊",
  },
  {
    "How i can connect my mongodb to SAP CAP application?":
      "To connect MongoDB to an SAP CAP (Cloud Application Programming Model) application, follow these steps. Since direct documentation links are unavailable, I’ll outline the process and provide a sample configuration:\n\n---\n\n### **1. Prerequisites**\n- **MongoDB instance**: Ensure your MongoDB is accessible from the SAP environment (e.g., via a public IP or VPC).\n- **CAP project**: A SAP CAP project with a `cds` model (e.g., `entity` definitions).\n- **Node.js**: Ensure the MongoDB Node.js driver (`mongodb`) is installed.\n\n---\n\n### **2. Define the Data Model**\nIn your `entities.cds` file, define your MongoDB collections as entities:\n```cds\nnamespace myapp;\n\nentity MyCollection {\n  key id : String;\n  name : String;\n  // Add other fields matching your MongoDB schema\n}\n```\n\n---\n\n### **3. Configure MongoDB Connection**\nUpdate the `db.js` file in your `srv` folder to include MongoDB connection details:\n```javascript\nconst { MongoClient } = require('mongodb');\n\nconst db = {\n  default: {\n    client: MongoClient,\n    options: {\n      useNewUrlParser: true,\n      useUnifiedTopology: true,\n      authSource: 'admin', // Optional: if authentication is required\n    },\n    connection: {\n      host: 'mongodb://<username>:<password>@<host>:<port>/<database>?authSource=admin',\n    },\n  },\n};\n\nmodule.exports = db;\n```\n- Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your MongoDB credentials.\n- Ensure the MongoDB driver (`mongodb`) is installed via npm:\n  ```bash\n  npm install mongodb\n  ```\n\n---\n\n### **4. Deploy and Test**\n1. **Deploy the CAP app**:\n   ```bash\n   cds deploy\n   ```\n2. **Test the connection**:\n   - Use the `cds` CLI or a service like `@sap/cds-dk` to verify data access.\n   - Ensure the MongoDB instance is reachable and the user has proper permissions.\n\n---\n\n### **5. Troubleshooting**\n- **Connection Issues**: Check firewall rules, network access, and MongoDB authentication.\n- **Driver Errors**: Ensure the `mongodb` npm package is correctly installed.\n- **Data Mapping**: Verify that your CDS entities match the MongoDB collection schema.\n\n---\n\n### **Official SAP Resources**\nFor detailed guidance, refer to:\n1. **SAP Help Portal**:  \n   [https://help.sap.com](https://help.sap.com) (Search for \"CAP data sources\" or \"MongoDB integration\").\n2. **SAP Community**:  \n   [https://community.sap.com](https://community.sap.com) (Search for CAP + MongoDB tutorials).\n\nIf you encounter specific errors (e.g., connection timeouts, authentication failures), share the error message for targeted help!",
  },
  {
    "How i can connect SAP hana db with CAP application?":
      'To connect an SAP HANA database with a CAP (Cloud Application Programming Model) application, follow these steps:\n\n### 1. **Configure Database Connection in `package.json`**\n   - Update the `package.json` file in your CAP project to include the HANA database credentials:\n     ```json\n     {\n       "cap": {\n         "db": {\n           "driver": "sap-hana",\n           "host": "your-hana-host",\n           "port": 30015,\n           "user": "your-username",\n           "password": "your-password",\n           "database": "your-database-name"\n         }\n       }\n     }\n     ```\n   - Replace the placeholders with your HANA instance details.\n\n---\n\n### 2. **Install Required Dependencies**\n   - Ensure you have the necessary npm packages installed:\n     ```bash\n     npm install @sap/cds @sap/xssec\n     ```\n\n---\n\n### 3. **Verify Network Access**\n   - Ensure the HANA database is reachable from your application server. Check firewall rules and network settings if the connection fails.\n\n---\n\n### 4. **Start the CAP Application**\n   - Run the CAP application to test the connection:\n     ```bash\n     cds serve\n     ```\n   - If the connection is successful, the application will start without errors. Check the logs for any issues.\n\n---\n\n### 5. **Troubleshooting**\n   - **Error 415/500**: If you encounter errors like `415 Unsupported Media Type` or `500 Internal Server Error`, verify:\n     - Correctness of the HANA credentials in `package.json`.\n     - Compatibility between CAP version and HANA database.\n     - Proper installation of the SAP HANA client libraries.\n\n---\n\nFor detailed documentation, use the `sap_help_search` tool to find official SAP guides on CAP and HANA integration. Example query:\n```json\n{"name": "sap_help_search", "arguments": {"query": "CAP HANA database connection configuration"}}\n```',
  },
  {
    "Hello, Good afternoon":
      "Hello! Good afternoon to you as well. How can I assist you today? If you have any questions about SAP technologies, configurations, or troubleshooting, feel free to share the details!",
  },
  {
    "What is SAP CAP?":
      "**SAP CAP (Cloud Application Programming Model)** is a framework and set of tools provided by SAP for building **cloud-native applications** and **microservices**. It enables developers to create modern, scalable, and maintainable applications using **open standards** and **cloud technologies**.\n\n### Key Features of SAP CAP:\n1. **Cloud-Native Development**:\n   - Built for **SAP Cloud Platform** (SCP) and **SAP S/4HANA Cloud**.\n   - Supports **microservices architecture**, **containerization**, and **cloud deployment**.\n\n2. **Technologies Used**:\n   - **Node.js** (JavaScript runtime).\n   - **TypeScript** (for type-safe development).\n   - **OpenAPI (Swagger)** for defining APIs.\n   - **SQL/SQLScript** for database interactions (with SAP HANA or other databases).\n\n3. **Core Components**:\n   - **Model-View-Controller (MVC)**: For structuring applications.\n   - **Data Models**: Define entities and relationships (e.g., using `@odata.entity` annotations).\n   - **APIs**: Exposed via OpenAPI for integration.\n   - **Persistence**: Connects to databases (e.g., SAP HANA, MySQL, PostgreSQL).\n   - **Authentication/Authorization**: Integrates with SAP Identity Authentication (SAP IDA) or OAuth2.\n\n4. **Use Cases**:\n   - Building **custom microservices** for SAP S/4HANA Cloud.\n   - Developing **cloud extensions** for SAP systems.\n   - Creating **integration services** between SAP and external systems.\n   - Implementing **business logic** in a cloud-native way.\n\n5. **Tools and Services**:\n   - **SAP Cloud SDK**: For integrating with SAP systems.\n   - **SAP Business Application Studio (BAS)**: IDE for CAP development.\n   - **SAP Cloud Platform Cockpit**: For deploying and managing CAP applications.\n\n### Example Use Case:\nA developer might use CAP to create a microservice that:\n- Fetches customer data from SAP HANA using SQLScript.\n- Exposes a REST API via OpenAPI.\n- Integrates with an external CRM system using SAP Cloud SDK.\n- Deploys the service to SAP Cloud Platform.\n\n### Why Use SAP CAP?\n- **Modern Architecture**: Aligns with cloud-native principles (e.g., scalability, resilience).\n- **Open Standards**: Leverages widely-used technologies like Node.js and OpenAPI.\n- **Integration**: Seamlessly connects with SAP on-premise and cloud systems.\n\nIf you're working with SAP S/4HANA Cloud or SAP Cloud Platform, CAP is a key tool for extending or customizing your SAP environment. Let me know if you'd like examples or guidance on specific CAP components!",
  },
  {
    "What is AIPM?":
      "I currently don't have specific details about what AIPM is. However, I can provide information if you ask about the AIPM project, such as its mobile or web application manuals. Let me know how you'd like to proceed!",
  },
  {
    "What is AIPM project?":
      'As of now, there is no widely recognized or officially documented project called the "AIPM project" in major technology, academic, or public domains. It\'s possible that "AIPM" could refer to a specific initiative, a private project, or a misinterpretation or misspelling of a term.\n\nHere are a few possibilities to consider:\n\n1. **AIPM as an acronym**:  \n   - AIPM could stand for various things, such as:\n     - **AI Project Management** – a framework or initiative for managing AI-related projects.\n     - **Association of International Project Managers** – a professional organization.\n     - **Advanced Intelligent Project Management** – a hypothetical or internal project concept.\n   - In this context, "AIPM project" might refer to a project focused on managing AI-driven initiatives efficiently.\n\n2. **Possible confusion with similar terms**:  \n   - It might be a mix-up with "AI PM" (Artificial Intelligence Project Manager) or "AI-PM" (Artificial Intelligence Project Management).\n   - It could also be confused with "AIP" (Artificial Intelligence Platform) or "AIPM" as a component of a larger system.\n\n3. **No known public project**:  \n   - There is no publicly known or verified project titled "AIPM" in AI, software, or project management communities as of now.\n\n👉 **Conclusion**:  \nThe "AIPM project" does not appear to be a known or established project in the public domain. If you\'re referring to a specific organization, academic initiative, or internal project, please provide more context (e.g., the field, organization, or use case), and I’d be happy to help clarify or explore further.\n\nLet me know if you meant something else by "AIPM"!',
  },
  {
    "What is AIPM project?":
      'It seems there was an error while attempting to retrieve information about the "AIPM project." The system encountered a validation error because the input provided wasn\'t a valid string.  \n\nHowever, as of now, there is no widely known or officially recognized project called "AIPM" in the fields of artificial intelligence, technology, or public projects. It\'s possible that "AIPM" could stand for something specific within a particular organization, academic field, or private initiative—but without more context, it\'s difficult to identify.\n\nIf you can provide more details—such as the full name, the domain (e.g., AI, healthcare, education), or where you encountered the term—I’d be happy to help clarify or find relevant information.',
  },
  {
    "What is AIPM project?":
      'As of now, there is no widely recognized or officially documented project known as the "AIPM project" in major public databases, academic literature, or technology communities. It\'s possible that "AIPM" could refer to something specific within a niche field, organization, or internal initiative—such as a project related to artificial intelligence, policy, or management—though no authoritative source confirms such a project.\n\nIf you have more context (e.g., a specific domain like AI, healthcare, or governance), I’d be happy to help explore possibilities or clarify further. Let me know!',
  },
  {
    "What is AIPM project?":
      'It seems there was an error while attempting to retrieve information about the AIPM project. The system encountered a validation issue with the input format, likely due to an incorrect or improperly structured request.\n\nAs of now, there is no widely known or officially recognized project called "AIPM" in prominent domains like artificial intelligence, software development, or public initiatives. It\'s possible that "AIPM" could refer to a specific, niche, or private project, or it might be a typo or confusion with another acronym.\n\nIf you can provide more context—such as the field (e.g., AI, healthcare, education, or a specific organization)—I’d be happy to help clarify or guide you toward the right information.',
  },
  {
    "What is AIPM project?":
      'The **AIPM project** refers to the **Airdit Intelligent Plant Maintenance (AIPM)** application, which is a mobile-based solution designed to simplify and streamline plant maintenance activities in industrial environments.\n\n### Key Features and Objectives of AIPM:\n\n1. **Mobile-First Approach**:\n   - AIPM is accessible on both **Android and iOS** mobile devices, enabling plant personnel to manage maintenance tasks directly from their smartphones or tablets.\n\n2. **DCS Integration with SAP**:\n   - The system integrates with a **Distributed Control System (DCS)** to capture real-time run/stop events from industrial equipment.\n   - A custom table (`ZPM_TAG_DETAILS`) stores tag numbers, plant codes, major equipment numbers, and work centers. This data ensures that only properly configured tags trigger stoppage entries in the AIPM dashboard.\n\n3. **Real-Time Monitoring**:\n   - When a DCS sends an API call indicating a run/stop event, the system verifies the tag details in the custom table. If valid, the event is recorded in the `ZPM_STOPPG_SHEET` table and displayed on the AIPM stoppage dashboard.\n\n4. **Background Jobs (Batch Processes)**:\n   - **Daily Batch Job (00:00)**: Closes the previous day’s run/stop time entries and initializes new start times for the current day using the program `ZPM_DCS_STOPPAGE_SHEET`.\n   - **Every 8 Hours (Starting at 7 AM)**: Checks for any run/stop entries from the DCS over the past 8 hours. If no entries are found, it sends a notification email to the planner based on major equipment in the `ZPM_TAG_DETAILS` table, using the program `ZPM_DCS_RUN_STOP_SEND_MAIL`.\n   - **Every 15 Minutes**: Monitors for stoppage entries and updates the system accordingly.\n\n5. **Data Editability**:\n   - Users can edit acknowledged entries (e.g., Reason, Responsible Area, Remarks) using the "Progress F4" filter in the AIPM app.\n   - These changes are updated in the `ZPM_STOPPG_SHEET` and `ZSTOPPAGE_SHEET` tables.\n\n6. **Key Benefits**:\n   - Reduces manual reporting and paperwork.\n   - Improves real-time visibility of equipment status.\n   - Enhances responsiveness in maintenance operations through automated alerts and data updates.\n\n### Summary:\nAIPM is an intelligent, mobile-based maintenance application that connects industrial DCS systems with SAP, enabling real-time monitoring, automated alerts, and efficient maintenance management. It simplifies operations by providing a user-friendly interface and ensuring data consistency through structured integration and background processing.\n\n> 📌 Note: The term "AIPM" stands for **Airdit Intelligent Plant Maintenance**, and the project is primarily used in industrial manufacturing or process plants to manage equipment stoppages and maintenance activities efficiently.',
  },
  {
    "What is AIPM project?":
      'It seems there might be a misunderstanding or incomplete information in your query. The term "AIPM" does not clearly refer to a widely recognized or officially documented project as of now. \n\nHowever, based on the fragment you provided — "AIPM Phase – 2 MOBILe" — it appears to be a reference to a project or initiative, possibly related to a mobile application or digital platform, with "AIPM" potentially standing for something like "AIPM" (e.g., an acronym in a specific field such as agriculture, health, or technology), and "Phase – 2 MOBILe" suggesting a second stage of development focused on mobile capabilities.\n\nThat said, there is no known globally recognized project officially named "AIPM" or "AIPM Phase 2 MOBILe" in public databases, government initiatives, or major technology platforms.\n\nTo clarify:\n- If you are referring to a specific organization, university, or government initiative, please provide more context.\n- If "AIPM" is an internal or regional project, it may not be publicly documented.\n\nCould you please clarify:\n- The full name or context of the AIPM project?\n- The domain (e.g., agriculture, health, education, transportation)?\n- Whether this is related to a specific country or organization?\n\nWith more details, I can provide a more accurate and helpful response.',
  },
  {
    "What is AIPM project?":
      'It seems there\'s a bit of confusion in your message. You mentioned "AIPM project," and then included "AIPM Phase – 2 MOBILe," but no clear explanation or context was provided about what the AIPM project is.\n\nLet me clarify:\n\nThere is **no widely known or officially recognized project** named "AIPM" in major global or public domains (such as government initiatives, international organizations, or well-documented technology projects) as of now.\n\nHowever, the term **"AIPM"** might be interpreted in a few possible ways:\n\n1. **AIPM as an acronym**:\n   - It could stand for something like "AI for Public Management," "Advanced Information Processing Model," or similar — especially if it\'s a niche or internal project.\n   - "AIPM Phase – 2 MOBILe" might suggest a phased initiative (e.g., Phase 2) focused on mobile applications or digital transformation in public services.\n\n2. **Possible confusion with similar acronyms**:\n   - **AIPM** is sometimes used in technical or academic fields, such as in AI or management systems.\n   - "MOBILe" may refer to a mobile-based application or platform.\n\n3. **Contextual interpretation**:\n   - If this is from a specific organization (like a university, government body, or tech startup), it might be an internal or emerging project related to AI and mobile solutions for public service delivery.\n\n🔍 **Conclusion**:\nThe "AIPM Project" is not a well-known or publicly documented initiative. The phrase "AIPM Phase – 2 MOBILe" appears to be a specific reference, possibly internal or project-specific, and without more context (such as the organization or domain), it\'s difficult to define precisely.\n\n👉 If you can provide more context — such as the organization, country, or field (e.g., education, healthcare, public administration) — I’d be happy to help you interpret or explain it further.\n\nLet me know! 😊',
  },
  {
    "What is AIPM project?":
      'It appears there may be a misunderstanding or confusion in your query.\n\nThe term **"AIPM"** does not correspond to a widely recognized or officially documented project in global or public databases, especially when combined with phrases like **"PhAse – 2 MOBILe"**.\n\nLet’s break this down:\n\n- **AIPM** could be interpreted in various ways:\n  - It might be an acronym for a specific project, organization, or initiative — but there is no known major international or widely recognized project named "AIPM" in fields like technology, energy, health, or transportation.\n  - In some contexts, AIPM might refer to the **Association of Indian Publishers (AIPM)** or similar bodies, but these are not known to have a project called "PhAse – 2 MOBILe".\n\n- **"PhAse – 2 MOBILe"**:\n  - This appears to be a project name or phase designation, possibly related to a technology or infrastructure initiative.\n  - The use of "MOBILe" suggests a mobile or mobility-related project (e.g., mobile connectivity, smart transportation).\n  - However, there is no publicly available or authoritative source confirming a project named "AIPM PhAse – 2 MOBILe".\n\n🔍 Conclusion:\nThere is **no verified or publicly known project** called **"AIPM PhAse – 2 MOBILe"** in any major database, government initiative, or academic literature.\n\nIf you are referring to a project within a specific organization, university, or regional initiative, please provide more context — such as:\n- The country or region where it\'s located\n- The sector (e.g., transportation, energy, education)\n- The organization or institution involved\n\nWith that, I can help you better understand or locate the correct information.\n\nLet me know how you\'d like to proceed!',
  },
];

const NewChat = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState(initialChatHistory);

  const onClickSend = () => {
    if (!query.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { [query]: "This is a sample answer." },
    ]);

    setQuery("");
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {chatHistory.map((item, index) => {
          const [question, answer] = Object.entries(item)[0];

          return (
            <div key={index} className="mb-4 space-y-2">
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  {question}
                </div>
              </div>

              <div className="chat chat-start">
                <div
                  className="chat-bubble w-[60%]"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(answer),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 sticky bottom-0 rounded-2xl">
        <textarea
          placeholder="Ask anything..."
          className="w-full textarea textarea-xl pr-20 rounded-2xl"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="btn btn-primary absolute bottom-6 right-5 rounded-2xl"
          onClick={onClickSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default NewChat;
