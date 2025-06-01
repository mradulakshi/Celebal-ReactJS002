import React, { Component } from "react";

const countryOptions = [
  { name: "India", code: "+91", cities: ["Delhi", "Mumbai", "Bangalore"] },
  { name: "USA", code: "+1", cities: ["New York", "San Francisco", "Chicago", "Los Angeles"] },
  { name: "UK", code: "+44", cities: ["London", "Manchester", "Bristol"] },
];

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      phoneCountryCode: "",
      phoneNumber: "",
      country: "",
      city: "",
      showPassword: false,
      // Error states
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailAddressError: "",
      passwordError: "",
      passwordConfirmationError: "",
      phoneCountryCodeError: "",
      phoneNumberError: "",
      countryError: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === "country") {
      const selectedCountry = countryOptions.find((c) => c.name === value);
      if (selectedCountry) {
        this.setState({ phoneCountryCode: selectedCountry.code, city: "" });
      }
    }
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      this.setState({ [`${name}Error`]: `${name.replace(/([A-Z])/g, " $1")} is required` });
    } else {
      this.setState({ [`${name}Error`]: "" });
    }
  };

  toggleShowPassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  render() {
    const selectedCountry = countryOptions.find(c => c.name === this.state.country);
    const cities = selectedCountry ? selectedCountry.cities : [];

    return (
      <form onSubmit={this.handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Registration Form</h2>

        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        {this.state.firstNameError && <div className="errorMsg">{this.state.firstNameError}</div>}

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        {this.state.lastNameError && <div className="errorMsg">{this.state.lastNameError}</div>}

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        {this.state.usernameError && <div className="errorMsg">{this.state.usernameError}</div>}

        <input
          type="email"
          placeholder="Email Address"
          name="emailAddress"
          value={this.state.emailAddress}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        {this.state.emailAddressError && <div className="errorMsg">{this.state.emailAddressError}</div>}

        <div style={{ position: "relative" }}>
          <input
            type={this.state.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={this.toggleShowPassword}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              cursor: "pointer",
            }}
            tabIndex={-1}
          >
            {this.state.showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {this.state.passwordError && <div className="errorMsg">{this.state.passwordError}</div>}

        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirmation"
          value={this.state.passwordConfirmation}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        {this.state.passwordConfirmationError && <div className="errorMsg">{this.state.passwordConfirmationError}</div>}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <select
            name="phoneCountryCode"
            value={this.state.phoneCountryCode}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={{ flex: 1 }}
          >
            <option value="">Code</option>
            {countryOptions.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={{ flex: 2 }}
            autoComplete="off"
          />
        </div>
        {this.state.phoneCountryCodeError && <div className="errorMsg">{this.state.phoneCountryCodeError}</div>}
        {this.state.phoneNumberError && <div className="errorMsg">{this.state.phoneNumberError}</div>}

        <select
          name="country"
          value={this.state.country}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        >
          <option value="">Select Country</option>
          {countryOptions.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        {this.state.countryError && <div className="errorMsg">{this.state.countryError}</div>}

        <select
          name="city"
          value={this.state.city}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={!this.state.country}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <button type="submit" style={{ marginTop: "20px", padding: "10px 20px" }}>
          Submit
        </button>
      </form>
    );
  }
}

export default FormComponent;
