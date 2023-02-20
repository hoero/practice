abstract class Department {
    // private readonly id: string;
    // private name: string;
    static fiscalYear: string = '2022';
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = name;
        // console.log(Department.fiscalYear);
    }

    static createEmployee(name: string) {
        return { name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string): void {
        this.employees.push(employee);
    }

    printEmployeesInfo() {
        console.log(this.employees.length, this.employees);
    }
}

class IT extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log(`IT department ID is ${this.id}`);
    }
}

class Accounting extends Department {
    private lastReport: string;
    private static instance: Accounting;

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (Accounting.instance) {
            return this.instance;
        }
        this.instance = new Accounting('d1', []);
        return this.instance;
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found!');
    }

    set mostRecentReport(report: string) {
        if (!report) {
            throw new Error('Please pass in a valid report!');
        }
        this.addReport(report);
    }

    describe() {
        console.log(`Accounting department ID is ${this.id}`);
    }

    addEmployee(employee: string) {
        if (employee === 'Max') {
            return;
        }
        this.employees.push(employee);
    }

    addReport(report: string) {
        this.reports.push(report);
        this.lastReport = report;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee = Department.createEmployee('Max');
console.log(employee);

// const accounting = new Accounting('d1', []);
const accounting = Accounting.getInstance();

accounting.addEmployee('Max');
accounting.addEmployee('John');

accounting.describe();
accounting.printEmployeesInfo();

accounting.addReport('Opportunities');
accounting.mostRecentReport = 'Last year returns';
accounting.printReports();

console.log(accounting.mostRecentReport);
