import mssql from 'mssql';

class Services {

    private static connection: mssql.ConnectionPool;
    private static instance: Services;

    private constructor(
    ) { 
        this.initServices();
    }

    private initServices = async () => {

        try {
            console.log(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
            
            const config: mssql.config = {
                server: process.env.DB_HOST!,
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                driver: 'tedious',
                options: {
                    encrypt: false,
                    tdsVersion: '7_0',
                    trustedConnection: true,
                    trustServerCertificate: true,
                },
            };
    
            Services.connection = await mssql.connect(config);
            
        } catch (error) {
            console.log(error)
            this.initServices();
        }
    }

    public static getInstance(): Services {

        if (!Services.instance) {

            Services.instance = new Services();

        }

        return Services.instance;

    }

    public async GeneratePDFByPatient() {
        try {

            const result = await Services.connection.query("SELECT COUNT(*) FROM ahfpaci1")

            return result.recordset;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

export default Services;