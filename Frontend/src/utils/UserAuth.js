import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("ht_customer");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error reading user:", error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("ht_customer", JSON.stringify(user));
    } else {
      localStorage.removeItem("ht_customer");
    }
  }, [user]);

  // LOGIN
  const login = async ({ phone }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const account = {
      name: "Customer",
      phone: phone,
      addresses: [],
    };

    setUser(account);
    return account;
  };

  // REGISTER
  const register = async ({ name, email }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const account = {
      name: name,
      email: email,
      addresses: [],
    };

    setUser(account);
    return account;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  // UPDATE PROFILE
  const updateProfile = (patch) => {
    setUser((previousUser) => ({
      ...previousUser,
      ...patch,
    }));
  };

  // Yahan JSX ke bajaye React.createElement use kiya hai taaki .js file mein error na aaye
  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      },
    },
    children
  );
}

// USE AUTH
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}