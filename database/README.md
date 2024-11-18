# SQL Server Database Setup
Outline for setting up the DB tables and sample data in Microsoft SQL Server (MSS)
 - [Microsoft SQL Server Express download](https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x409&culture=en-us&country=us)

## Running the SQL Scripts
### 1. **Clone the Project from GitHub**
   - Change directories into the desired folder to clone the project into
   - Navigate to the repository on GitHub and clone the project using the following command:
     ```bash
     git clone <repository-url>
     ```
   - Change directories into the cloned repo folder
   - Clone the database branch using the following command:
     ```bash
     git switch database
     ```

### 2. **Launch Microsoft SQL Server**
   - Connect to the initial database engine prompt when MSS opens
   - Go to **File** → **Open** → **File**
   - Open all three scripts in the database branch of your cloned repo

### 3. **Set up Database Tables**
   - **Execute** the **CardGameDB.sql** file in MSS

### 4. **Set up Sample Data**
   - **Execute** the **CardGameDB_SampleData.sql** file in MSS

### 5. **Reset DB Tables (if needed)**
   - To empty the database tables:
   - **Execute** the **CardGameDB_TableDelete.sql** file
   - **Execute** the **CardGameDB.sql** file