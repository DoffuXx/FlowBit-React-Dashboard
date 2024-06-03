import axios from "axios";
import { deleteMediatheque, fetchMediatheques } from "../src/api/mediatheque";

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

describe("deleteMedia", () => {
  const setSuccess = jest.fn();
  const setLoading = jest.fn();
  const setMedias = jest.fn();
  const mockMedias = {
    "hydra:member": [
      /* mock media data */
    ],
    "hydra:totalItems": 100,
    "hydra:view": {
      "hydra:next": "/media?page=2",
      "hydra:previous": null,
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should delete media correctly", async () => {
    const mediaId = "1";
    (axios.delete as jest.Mock).mockResolvedValueOnce({ data: mockMedias });
    await deleteMediatheque(mediaId, setSuccess, setLoading, setMedias);
    expect(setLoading).toHaveBeenCalledTimes(2);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setMedias).toHaveBeenCalledTimes(1);
    expect(setSuccess).toHaveBeenCalledTimes(1);
    expect(setSuccess).toHaveBeenCalledWith("Votre média a bien été supprimé");
  });
});
