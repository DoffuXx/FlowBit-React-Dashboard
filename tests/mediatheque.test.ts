import axios from "axios";
import { fetchMediatheques } from "../src/api/mediatheque";

jest.mock("../src/constants", () => ({
  ENVIRONMENT: "development",
  API_URL: "http://localhost:8000/api",
  API_HOME: "http://localhost:8000",
}));

jest.mock("axios");

describe("fetchMediatheque", () => {
  let setMediasMock;
  let setLoadingMock;
  let setErrorMock;
  let setPageInfoMock;
  beforeEach(() => {
    setMediasMock = jest.fn();
    setLoadingMock = jest.fn();
    setErrorMock = jest.fn();
    setPageInfoMock = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch media data correctly", async () => {
    const mockMediaData = {
      "hydra:member": [
        /* mock media data */
      ],
      "hydra:totalItems": 100,
      "hydra:view": {
        "hydra:next": "/media?page=2",
        "hydra:previous": null,
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockMediaData });

    await fetchMediatheques(
      setMediasMock,
      setLoadingMock,
      setErrorMock,
      1, // pageInfoCurrent
      setPageInfoMock,
      "", // beforeDate
      "", // afterDate
      "", // search
    );

    expect(setLoadingMock).toHaveBeenCalledTimes(2);
    expect(setLoadingMock).toHaveBeenCalledWith(true);
    expect(setLoadingMock).toHaveBeenCalledWith(false);

    expect(setMediasMock).toHaveBeenCalledTimes(1);
    expect(setMediasMock).toHaveBeenCalledWith(mockMediaData["hydra:member"]);

    expect(setPageInfoMock).toHaveBeenCalledTimes(1);
    expect(setPageInfoMock).toHaveBeenCalledWith({
      currentPage: 1,
      totalItems: mockMediaData["hydra:totalItems"],
      nextPage: mockMediaData["hydra:view"]["hydra:next"],
      prevPage: mockMediaData["hydra:view"]["hydra:previous"],
    });

    expect(setErrorMock).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toHaveBeenCalledWith("");
  });
  it("should handle error correctly", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await fetchMediatheques(
      setMediasMock,
      setLoadingMock,
      setErrorMock,
      1, // pageInfoCurrent
      setPageInfoMock,
      "", // beforeDate
      "", // afterDate
      "", // search
    );

    expect(setLoadingMock).toHaveBeenCalledTimes(2);
    expect(setLoadingMock).toHaveBeenCalledWith(true);
    expect(setLoadingMock).toHaveBeenCalledWith(false);

    expect(setMediasMock).not.toHaveBeenCalled();
    expect(setPageInfoMock).not.toHaveBeenCalled();

    expect(setErrorMock).toHaveBeenCalledTimes(1);
    expect(setErrorMock).toHaveBeenCalledWith("Quelque chose s'est mal passé");
  });
});
