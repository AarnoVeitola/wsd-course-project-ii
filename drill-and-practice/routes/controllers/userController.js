import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getUserData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ render, request, response }) => {
  const registrationData = await getUserData(request);
  
  const [passes, errors] = await validasaur.validate(
    registrationData,
    registrationValidationRules
  );

  if (!passes) {
    console.log(errors);
    registrationData.validationErrors = errors;
    render("registration.eta", registrationData);
  } else {
    await userService.addUser(
      registrationData.email,
      await bcrypt.hash(registrationData.password),
    );
  
    response.redirect("/auth/login");
  }
};

const processLogin = async ({ render, request, response, state }) => {
  const loginData = await getUserData(request);

  const userFromDatabase = await userService.findUserByEmail(
    loginData.email
  );

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    loginData.password,
    user.password,
  );

  if (!passwordMatches) {
    loginData.errors = [];
    loginData.errors.push("Wrong password. Please try again.");
    render("login.eta", loginData);
  } else {
    await state.session.set("user", user);
    response.redirect("/");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta", { email: "", password: "" });
};

const showLoginForm = ({ render }) => {
  render("login.eta", { email: "", password: "" });
};

export { registerUser, processLogin, showRegistrationForm, showLoginForm };