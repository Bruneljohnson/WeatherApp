import { render, screen, fireEvent } from "@testing-library/react";
import { UIError } from "../../../components/Error";
import { IError } from "@/types";

describe("<UiError/>", () => {
  let setQuery = jest.fn();
  let setError = jest.fn();
  let error: IError;

  beforeEach(() => {
    error = {
      title: "",
      message: [""],
      isError: false,
    };
  });
  test("should not render error initially", () => {
    render(<UIError setError={setError} setQuery={setQuery} error={error} />);

    const errorTitle = screen.queryByText(/""/i);
    const errorMessages = screen.queryAllByTestId("error-msg");

    expect(errorTitle).not.toBeInTheDocument();
    expect(errorMessages[0]).toBeEmptyDOMElement();
    expect(errorMessages[1]).toBeEmptyDOMElement();
  });

  describe("<UiError /> on error", () => {
    beforeEach(() => {
      error = {
        title: "Unable to retrieve weather forcast.",
        message: [
          `Your request was sent, but we could not connect to "De" weather forecast.`,
          `Please make sure the city is spelt correctly and try again.`,
        ],
        isError: true,
      };
    });
    test("should render on error.", () => {
      render(<UIError setError={setError} setQuery={setQuery} error={error} />);

      const errorTitle = screen.getByText(error.title);
      const errorMessages = screen.getAllByTestId("error-msg");
      const errorButton = screen.getByRole("button", { name: /try again/i });

      expect(errorTitle).toBeInTheDocument();
      expect(errorButton).toBeInTheDocument();
      expect(errorMessages[0]).toHaveTextContent(
        `Your request was sent, but we could not connect to "De" weather forecast.`
      );
      expect(errorMessages[1]).toHaveTextContent(
        `Please make sure the city is spelt correctly and try again.`
      );
    });
    test("should remove error onClick.", () => {
      const { rerender } = render(
        <UIError setError={setError} setQuery={setQuery} error={error} />
      );

      const errorTitle = screen.getByText(error.title);
      const errorMessages = screen.getAllByTestId("error-msg");
      const errorButton = screen.getByRole("button", { name: /try again/i });

      fireEvent.click(errorButton);

      error = {
        title: "",
        message: [""],
        isError: false,
      };
      rerender(
        <UIError setError={setError} setQuery={setQuery} error={error} />
      );

      expect(errorTitle).toBeEmptyDOMElement();
      expect(errorButton).toBeEmptyDOMElement();
      expect(errorMessages[0]).toBeEmptyDOMElement();
      expect(errorMessages[1]).toBeEmptyDOMElement();
    });
  });
});
