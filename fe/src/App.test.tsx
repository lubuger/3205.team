import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./app/App"

test("renders learn react link", () => {
    const view = render(
        <Provider store={store}>
            <App />
        </Provider>,
    )

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(view.getByText(/learn/i)).toBeInTheDocument()
})
