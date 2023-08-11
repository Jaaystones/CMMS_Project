class Users {
    constructor(Id, First_name, Last_name, Username, Password, Email, Phone_number, City) {
        this.Id = Id;
        this.First_name = First_name;
        this.Last_name = Last_name;
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.Phone_number = Phone_number;
        this.City = City;
    }
}

export { Users }; // Export using ES6 module syntax