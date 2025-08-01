import type { Chain } from "../../../chains/types.js";
import type { Address } from "../../../utils/address.js";

export type TokenInfo = {
  name: string;
  symbol: string;
  address: string;
  icon?: string;
};

const wrappedEthIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAwIiBoZWlnaHQ9IjI1MDAiIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzYyN0VFQSIvPjxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZmlsbC1vcGFjaXR5PSIuNjAyIiBkPSJNMTYuNDk4IDR2OC44N2w3LjQ5NyAzLjM1eiIvPjxwYXRoIGQ9Ik0xNi40OTggNEw5IDE2LjIybDcuNDk4LTMuMzV6Ii8+PHBhdGggZmlsbC1vcGFjaXR5PSIuNjAyIiBkPSJNMTYuNDk4IDIxLjk2OHY2LjAyN0wyNCAxNy42MTZ6Ii8+PHBhdGggZD0iTTE2LjQ5OCAyNy45OTV2LTYuMDI4TDkgMTcuNjE2eiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjIiIGQ9Ik0xNi40OTggMjAuNTczbDcuNDk3LTQuMzUzLTcuNDk3LTMuMzQ4eiIvPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjYwMiIgZD0iTTkgMTYuMjJsNy40OTggNC4zNTN2LTcuNzAxeiIvPjwvZz48L2c+PC9zdmc+";

const tetherUsdIcon =
  "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzkuNDMgMjk1LjI3Ij48dGl0bGU+dGV0aGVyLXVzZHQtbG9nbzwvdGl0bGU+PHBhdGggZD0iTTYyLjE1LDEuNDVsLTYxLjg5LDEzMGEyLjUyLDIuNTIsMCwwLDAsLjU0LDIuOTRMMTY3Ljk1LDI5NC41NmEyLjU1LDIuNTUsMCwwLDAsMy41MywwTDMzOC42MywxMzQuNGEyLjUyLDIuNTIsMCwwLDAsLjU0LTIuOTRsLTYxLjg5LTEzMEEyLjUsMi41LDAsMCwwLDI3NSwwSDY0LjQ1YTIuNSwyLjUsMCwwLDAtMi4zLDEuNDVoMFoiIHN0eWxlPSJmaWxsOiM1MGFmOTU7ZmlsbC1ydWxlOmV2ZW5vZGQiLz48cGF0aCBkPSJNMTkxLjE5LDE0NC44djBjLTEuMi4wOS03LjQsMC40Ni0yMS4yMywwLjQ2LTExLDAtMTguODEtLjMzLTIxLjU1LTAuNDZ2MGMtNDIuNTEtMS44Ny03NC4yNC05LjI3LTc0LjI0LTE4LjEzczMxLjczLTE2LjI1LDc0LjI0LTE4LjE1djI4LjkxYzIuNzgsMC4yLDEwLjc0LjY3LDIxLjc0LDAuNjcsMTMuMiwwLDE5LjgxLS41NSwyMS0wLjY2di0yOC45YzQyLjQyLDEuODksNzQuMDgsOS4yOSw3NC4wOCwxOC4xM3MtMzEuNjUsMTYuMjQtNzQuMDgsMTguMTJoMFptMC0zOS4yNVY3OS42OGg1OS4yVjQwLjIzSDg5LjIxVjc5LjY4SDE0OC40djI1Ljg2Yy00OC4xMSwyLjIxLTg0LjI5LDExLjc0LTg0LjI5LDIzLjE2czM2LjE4LDIwLjk0LDg0LjI5LDIzLjE2djgyLjloNDIuNzhWMTUxLjgzYzQ4LTIuMjEsODQuMTItMTEuNzMsODQuMTItMjMuMTRzLTM2LjA5LTIwLjkzLTg0LjEyLTIzLjE1aDBabTAsMGgwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg==";

const usdcIcon =
  "data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9Ijg2OTc3Njg0LTEyZGItNDg1MC04ZjMwLTIzM2E3YzI2N2QxMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIj4KICA8cGF0aCBkPSJNMTAwMCAyMDAwYzU1NC4xNyAwIDEwMDAtNDQ1LjgzIDEwMDAtMTAwMFMxNTU0LjE3IDAgMTAwMCAwIDAgNDQ1LjgzIDAgMTAwMHM0NDUuODMgMTAwMCAxMDAwIDEwMDB6IiBmaWxsPSIjMjc3NWNhIi8+CiAgPHBhdGggZD0iTTEyNzUgMTE1OC4zM2MwLTE0NS44My04Ny41LTE5NS44My0yNjIuNS0yMTYuNjYtMTI1LTE2LjY3LTE1MC01MC0xNTAtMTA4LjM0czQxLjY3LTk1LjgzIDEyNS05NS44M2M3NSAwIDExNi42NyAyNSAxMzcuNSA4Ny41IDQuMTcgMTIuNSAxNi42NyAyMC44MyAyOS4xNyAyMC44M2g2Ni42NmMxNi42NyAwIDI5LjE3LTEyLjUgMjkuMTctMjkuMTZ2LTQuMTdjLTE2LjY3LTkxLjY3LTkxLjY3LTE2Mi41LTE4Ny41LTE3MC44M3YtMTAwYzAtMTYuNjctMTIuNS0yOS4xNy0zMy4zMy0zMy4zNGgtNjIuNWMtMTYuNjcgMC0yOS4xNyAxMi41LTMzLjM0IDMzLjM0djk1LjgzYy0xMjUgMTYuNjctMjA0LjE2IDEwMC0yMDQuMTYgMjA0LjE3IDAgMTM3LjUgODMuMzMgMTkxLjY2IDI1OC4zMyAyMTIuNSAxMTYuNjcgMjAuODMgMTU0LjE3IDQ1LjgzIDE1NC4xNyAxMTIuNXMtNTguMzQgMTEyLjUtMTM3LjUgMTEyLjVjLTEwOC4zNCAwLTE0NS44NC00NS44NC0xNTguMzQtMTA4LjM0LTQuMTYtMTYuNjYtMTYuNjYtMjUtMjkuMTYtMjVoLTcwLjg0Yy0xNi42NiAwLTI5LjE2IDEyLjUtMjkuMTYgMjkuMTd2NC4xN2MxNi42NiAxMDQuMTYgODMuMzMgMTc5LjE2IDIyMC44MyAyMDB2MTAwYzAgMTYuNjYgMTIuNSAyOS4xNiAzMy4zMyAzMy4zM2g2Mi41YzE2LjY3IDAgMjkuMTctMTIuNSAzMy4zNC0zMy4zM3YtMTAwYzEyNS0yMC44NCAyMDguMzMtMTA4LjM0IDIwOC4zMy0yMjAuODR6IiBmaWxsPSIjZmZmIi8+CiAgPHBhdGggZD0iTTc4Ny41IDE1OTUuODNjLTMyNS0xMTYuNjYtNDkxLjY3LTQ3OS4xNi0zNzAuODMtODAwIDYyLjUtMTc1IDIwMC0zMDguMzMgMzcwLjgzLTM3MC44MyAxNi42Ny04LjMzIDI1LTIwLjgzIDI1LTQxLjY3VjMyNWMwLTE2LjY3LTguMzMtMjkuMTctMjUtMzMuMzMtNC4xNyAwLTEyLjUgMC0xNi42NyA0LjE2LTM5NS44MyAxMjUtNjEyLjUgNTQ1Ljg0LTQ4Ny41IDk0MS42NyA3NSAyMzMuMzMgMjU0LjE3IDQxMi41IDQ4Ny41IDQ4Ny41IDE2LjY3IDguMzMgMzMuMzQgMCAzNy41LTE2LjY3IDQuMTctNC4xNiA0LjE3LTguMzMgNC4xNy0xNi42NnYtNTguMzRjMC0xMi41LTEyLjUtMjkuMTYtMjUtMzcuNXpNMTIyOS4xNyAyOTUuODNjLTE2LjY3LTguMzMtMzMuMzQgMC0zNy41IDE2LjY3LTQuMTcgNC4xNy00LjE3IDguMzMtNC4xNyAxNi42N3Y1OC4zM2MwIDE2LjY3IDEyLjUgMzMuMzMgMjUgNDEuNjcgMzI1IDExNi42NiA0OTEuNjcgNDc5LjE2IDM3MC44MyA4MDAtNjIuNSAxNzUtMjAwIDMwOC4zMy0zNzAuODMgMzcwLjgzLTE2LjY3IDguMzMtMjUgMjAuODMtMjUgNDEuNjdWMTcwMGMwIDE2LjY3IDguMzMgMjkuMTcgMjUgMzMuMzMgNC4xNyAwIDEyLjUgMCAxNi42Ny00LjE2IDM5NS44My0xMjUgNjEyLjUtNTQ1Ljg0IDQ4Ny41LTk0MS42Ny03NS0yMzcuNS0yNTguMzQtNDE2LjY3LTQ4Ny41LTQ5MS42N3oiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg==";

const wrappedBtcIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDkuMjYgMTA5LjI2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzVhNTU2NDt9LmNscy0ye2ZpbGw6I2YwOTI0Mjt9LmNscy0ze2ZpbGw6IzI4MjEzODt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPndyYXBwZWQtYml0Y29pbi13YnRjPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxnIGlkPSJQYWdlLTEiPjxnIGlkPSJ3YnRjX2NvbG91ciIgZGF0YS1uYW1lPSJ3YnRjIGNvbG91ciI+PHBhdGggaWQ9IlNoYXBlIiBjbGFzcz0iY2xzLTEiIGQ9Ik04OS4wOSwyMi45M2wtMywzYTQyLjQ3LDQyLjQ3LDAsMCwxLDAsNTcuMzJsMywzYTQ2Ljc2LDQ2Ljc2LDAsMCwwLDAtNjMuMzlaIi8+PHBhdGggaWQ9IlNoYXBlLTIiIGRhdGEtbmFtZT0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTTI2LDIzLjE5YTQyLjQ3LDQyLjQ3LDAsMCwxLDU3LjMyLDBsMy0zYTQ2Ljc2LDQ2Ljc2LDAsMCwwLTYzLjM5LDBaIi8+PHBhdGggaWQ9IlNoYXBlLTMiIGRhdGEtbmFtZT0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTTIzLjE5LDgzLjI4YTQyLjQ3LDQyLjQ3LDAsMCwxLDAtNTcuMjlsLTMtM2E0Ni43Niw0Ni43NiwwLDAsMCwwLDYzLjM5WiIvPjxwYXRoIGlkPSJTaGFwZS00IiBkYXRhLW5hbWU9IlNoYXBlIiBjbGFzcz0iY2xzLTEiIGQ9Ik04My4yOCw4Ni4wNWE0Mi40Nyw0Mi40NywwLDAsMS01Ny4zMiwwbC0zLDNhNDYuNzYsNDYuNzYsMCwwLDAsNjMuMzksMFoiLz48cGF0aCBpZD0iU2hhcGUtNSIgZGF0YS1uYW1lPSJTaGFwZSIgY2xhc3M9ImNscy0yIiBkPSJNNzMuNTcsNDQuNjJjLS42LTYuMjYtNi04LjM2LTEyLjgzLTlWMjdINTUuNDZ2OC40NmMtMS4zOSwwLTIuODEsMC00LjIyLDBWMjdINDZ2OC42OEgzNS4yOXY1LjY1czMuOS0uMDcsMy44NCwwYTIuNzMsMi43MywwLDAsMSwzLDIuMzJWNjcuNDFhMS44NSwxLjg1LDAsMCwxLS42NCwxLjI5LDEuODMsMS44MywwLDAsMS0xLjM2LjQ2Yy4wNy4wNi0zLjg0LDAtMy44NCwwbC0xLDYuMzFINDUuOXY4LjgyaDUuMjhWNzUuNkg1NS40djguNjVoNS4yOVY3NS41M2M4LjkyLS41NCwxNS4xNC0yLjc0LDE1LjkyLTExLjA5LjYzLTYuNzItMi41My05LjcyLTcuNTgtMTAuOTNDNzIuMSw1Miw3NCw0OS4yLDczLjU3LDQ0LjYyWk02Ni4xNyw2My40YzAsNi41Ni0xMS4yNCw1LjgxLTE0LjgyLDUuODFWNTcuNTdDNTQuOTMsNTcuNTgsNjYuMTcsNTYuNTUsNjYuMTcsNjMuNFpNNjMuNzIsNDdjMCw2LTkuMzgsNS4yNy0xMi4zNiw1LjI3VjQxLjY5QzU0LjM0LDQxLjY5LDYzLjcyLDQwLjc1LDYzLjcyLDQ3WiIvPjxwYXRoIGlkPSJTaGFwZS02IiBkYXRhLW5hbWU9IlNoYXBlIiBjbGFzcz0iY2xzLTMiIGQ9Ik01NC42MiwxMDkuMjZhNTQuNjMsNTQuNjMsMCwxLDEsNTQuNjQtNTQuNjRBNTQuNjMsNTQuNjMsMCwwLDEsNTQuNjIsMTA5LjI2Wm0wLTEwNUE1MC4zNCw1MC4zNCwwLDEsMCwxMDUsNTQuNjIsNTAuMzQsNTAuMzQsMCwwLDAsNTQuNjIsNC4yNloiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+";

const maticIcon =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSI1MTIiIHI9IjUxMiIgZmlsbD0iIzgyNDdFNSIvPgo8cGF0aCBkPSJNNjgxLjQ2OSA0MDIuNDU2QzY2OS4xODkgMzk1LjMxMiA2NTMuMjI0IDM5NS4zMTIgNjM5LjcxNiA0MDIuNDU2TDU0My45MjggNDU3LjIyOEw0NzguODQyIDQ5Mi45NDlMMzgzLjA1NSA1NDcuNzIxQzM3MC43NzQgNTU0Ljg2NSAzNTQuODEgNTU0Ljg2NSAzNDEuMzAxIDU0Ny43MjFMMjY1LjE2MiA1MDQuODU2QzI1Mi44ODIgNDk3LjcxMiAyNDQuMjg2IDQ4NC42MTQgMjQ0LjI4NiA0NzAuMzI1VjM4NS43ODZDMjQ0LjI4NiAzNzEuNDk4IDI1MS42NTQgMzU4LjQgMjY1LjE2MiAzNTEuMjU2TDM0MC4wNzMgMzA5LjU4MUMzNTIuMzUzIDMwMi40MzcgMzY4LjMxOCAzMDIuNDM3IDM4MS44MjcgMzA5LjU4MUw0NTYuNzM3IDM1MS4yNTZDNDY5LjAxOCAzNTguNCA0NzcuNjE0IDM3MS40OTggNDc3LjYxNCAzODUuNzg2VjQ0MC41NThMNTQyLjcgNDAzLjY0NlYzNDguODc0QzU0Mi43IDMzNC41ODYgNTM1LjMzMiAzMjEuNDg4IDUyMS44MjQgMzE0LjM0NEwzODMuMDU1IDIzNS43NThDMzcwLjc3NCAyMjguNjE0IDM1NC44MSAyMjguNjE0IDM0MS4zMDEgMjM1Ljc1OEwyMDAuMDc2IDMxNC4zNDRDMTg2LjU2NyAzMjEuNDg4IDE3OS4xOTkgMzM0LjU4NiAxNzkuMTk5IDM0OC44NzRWNTA3LjIzN0MxNzkuMTk5IDUyMS41MjUgMTg2LjU2NyA1MzQuNjIzIDIwMC4wNzYgNTQxLjc2N0wzNDEuMzAxIDYyMC4zNTNDMzUzLjU4MiA2MjcuNDk4IDM2OS41NDYgNjI3LjQ5OCAzODMuMDU1IDYyMC4zNTNMNDc4Ljg0MiA1NjYuNzcyTDU0My45MjggNTI5Ljg2TDYzOS43MTYgNDc2LjI3OUM2NTEuOTk2IDQ2OS4xMzUgNjY3Ljk2MSA0NjkuMTM1IDY4MS40NjkgNDc2LjI3OUw3NTYuMzggNTE3Ljk1M0M3NjguNjYgNTI1LjA5OCA3NzcuMjU3IDUzOC4xOTUgNzc3LjI1NyA1NTIuNDg0VjYzNy4wMjNDNzc3LjI1NyA2NTEuMzEyIDc2OS44ODggNjY0LjQwOSA3NTYuMzggNjcxLjU1M0w2ODEuNDY5IDcxNC40MTlDNjY5LjE4OSA3MjEuNTYzIDY1My4yMjQgNzIxLjU2MyA2MzkuNzE2IDcxNC40MTlMNTY0LjgwNSA2NzIuNzQ0QzU1Mi41MjUgNjY1LjYgNTQzLjkyOCA2NTIuNTAyIDU0My45MjggNjM4LjIxNFY1ODMuNDQyTDQ3OC44NDIgNjIwLjM1M1Y2NzUuMTI1QzQ3OC44NDIgNjg5LjQxNCA0ODYuMjEgNzAyLjUxMiA0OTkuNzE5IDcwOS42NTZMNjQwLjk0NCA3ODguMjQyQzY1My4yMjQgNzk1LjM4NiA2NjkuMTg5IDc5NS4zODYgNjgyLjY5NyA3ODguMjQyTDgyMy45MjIgNzA5LjY1NkM4MzYuMjAzIDcwMi41MTIgODQ0Ljc5OSA2ODkuNDE0IDg0NC43OTkgNjc1LjEyNVY1MTYuNzYzQzg0NC43OTkgNTAyLjQ3NCA4MzcuNDMxIDQ4OS4zNzcgODIzLjkyMiA0ODIuMjMyTDY4MS40NjkgNDAyLjQ1NloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";

const binanceCoinIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGcgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0JBMkYiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTIuMTE2IDE0LjQwNEwxNiAxMC41MmwzLjg4NiAzLjg4NiAyLjI2LTIuMjZMMTYgNmwtNi4xNDQgNi4xNDQgMi4yNiAyLjI2ek02IDE2bDIuMjYtMi4yNkwxMC41MiAxNmwtMi4yNiAyLjI2TDYgMTZ6bTYuMTE2IDEuNTk2TDE2IDIxLjQ4bDMuODg2LTMuODg2IDIuMjYgMi4yNTlMMTYgMjZsLTYuMTQ0LTYuMTQ0LS4wMDMtLjAwMyAyLjI2My0yLjI1N3pNMjEuNDggMTZsMi4yNi0yLjI2TDI2IDE2bC0yLjI2IDIuMjZMMjEuNDggMTZ6bS0zLjE4OC0uMDAyaC4wMDJ2LjAwMkwxNiAxOC4yOTRsLTIuMjkxLTIuMjktLjAwNC0uMDA0LjAwNC0uMDAzLjQwMS0uNDAyLjE5NS0uMTk1TDE2IDEzLjcwNmwyLjI5MyAyLjI5M3oiLz48L2c+PC9zdmc+";

const BUSDIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzYuNDEgMzM3LjQyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2YwYjkwYjtzdHJva2U6I2YwYjkwYjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDE8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTY4LjIuNzFsNDEuNSw0Mi41TDEwNS4yLDE0Ny43MWwtNDEuNS00MS41WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIzMS4yLDYzLjcxbDQxLjUsNDIuNUwxMDUuMiwyNzMuNzFsLTQxLjUtNDEuNVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00Mi4yLDEyNi43MWw0MS41LDQyLjUtNDEuNSw0MS41TC43LDE2OS4yMVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yOTQuMiwxMjYuNzFsNDEuNSw0Mi41TDE2OC4yLDMzNi43MWwtNDEuNS00MS41WiIvPjwvZz48L2c+PC9zdmc+";

const fantomIcon =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO2ZpbGwtcnVsZTpldmVub2RkO30uY2xzLTJ7ZmlsbDojMTNiNWVjO30uY2xzLTN7bWFzazp1cmwoI21hc2spO308L3N0eWxlPjxtYXNrIGlkPSJtYXNrIiB4PSIxMCIgeT0iNiIgd2lkdGg9IjkzLjEiIGhlaWdodD0iMjAiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxnIGlkPSJhIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMCw2aDkzLjFWMjZIMTBaIi8+PC9nPjwvbWFzaz48L2RlZnM+PHRpdGxlPmZhPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxjaXJjbGUgY2xhc3M9ImNscy0yIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiLz48ZyBjbGFzcz0iY2xzLTMiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE3LjIsMTIuOWwzLjYtMi4xVjE1Wm0zLjYsOUwxNiwyNC43bC00LjgtMi44VjE3TDE2LDE5LjgsMjAuOCwxN1pNMTEuMiwxMC44bDMuNiwyLjFMMTEuMiwxNVptNS40LDMuMUwyMC4yLDE2bC0zLjYsMi4xWm0tMS4yLDQuMkwxMS44LDE2bDMuNi0yLjFabTQuOC04LjNMMTYsMTIuMiwxMS44LDkuOCwxNiw3LjNaTTEwLDkuNFYyMi41bDYsMy40LDYtMy40VjkuNEwxNiw2WiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==";

export type SupportedTokens = Record<number, TokenInfo[]>;
export type SupportedNFTs = Record<number, Address[]>;

// TODO these should be moved to chain definitions
const DEFAULT_TOKENS = {
  "1": [
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      icon: tetherUsdIcon,
      name: "Tether USD",
      symbol: "USDT",
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      icon: wrappedBtcIcon,
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
    },
    {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      icon: maticIcon,
      name: "Polygon",
      symbol: "WMATIC",
    },
  ],
  "10": [
    {
      address: "0x4200000000000000000000000000000000000006",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
  "56": [
    {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      icon: binanceCoinIcon,
      name: "Wrapped Binance Chain Token",
      symbol: "WBNB",
    },
    {
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      icon: BUSDIcon,
      name: "Binance USD",
      symbol: "BUSD",
    },
  ],
  "97": [
    {
      address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      icon: binanceCoinIcon,
      name: "Wrapped Binance Chain Testnet Token",
      symbol: "WBNB",
    },
    {
      address: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
      icon: BUSDIcon,
      name: "Binance USD",
      symbol: "BUSD",
    },
  ],
  "137": [
    {
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      icon: maticIcon,
      name: "Wrapped Matic",
      symbol: "WMATIC",
    },
    {
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      icon: tetherUsdIcon,
      name: "Tether USD",
      symbol: "USDT",
    },
    {
      address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
      icon: wrappedBtcIcon,
      name: "Wrapped BTC",
      symbol: "WBTC",
    },
  ],
  "250": [
    {
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
      icon: fantomIcon,
      name: "Wrapped Fantom",
      symbol: "WFTM",
    },
    {
      address: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      address: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
      icon: wrappedBtcIcon,
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
    },
  ],
  "420": [
    {
      address: "0x4200000000000000000000000000000000000006",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
  ],
  "4002": [
    {
      address: "0xf1277d1Ed8AD466beddF92ef448A132661956621",
      icon: fantomIcon,
      name: "Wrapped Fantom",
      symbol: "WFTM",
    },
  ],
  // Base mainnet
  "8453": [
    {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
  "42161": [
    {
      address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
  "43113": [
    {
      address: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwMyIgaGVpZ2h0PSIxNTA0IiB2aWV3Qm94PSIwIDAgMTUwMyAxNTA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIyODciIHk9IjI1OCIgd2lkdGg9IjkyOCIgaGVpZ2h0PSI4NDQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUwMi41IDc1MkMxNTAyLjUgMTE2Ni43NyAxMTY2LjI3IDE1MDMgNzUxLjUgMTUwM0MzMzYuNzM0IDE1MDMgMC41IDExNjYuNzcgMC41IDc1MkMwLjUgMzM3LjIzNCAzMzYuNzM0IDEgNzUxLjUgMUMxMTY2LjI3IDEgMTUwMi41IDMzNy4yMzQgMTUwMi41IDc1MlpNNTM4LjY4OCAxMDUwLjg2SDM5Mi45NEMzNjIuMzE0IDEwNTAuODYgMzQ3LjE4NiAxMDUwLjg2IDMzNy45NjIgMTA0NC45NkMzMjcuOTk5IDEwMzguNSAzMjEuOTExIDEwMjcuOCAzMjEuMTczIDEwMTUuOTlDMzIwLjYxOSAxMDA1LjExIDMyOC4xODQgOTkxLjgyMiAzNDMuMzEyIDk2NS4yNTVMNzAzLjE4MiAzMzAuOTM1QzcxOC40OTUgMzAzLjk5OSA3MjYuMjQzIDI5MC41MzEgNzM2LjAyMSAyODUuNTVDNzQ2LjUzNyAyODAuMiA3NTkuMDgzIDI4MC4yIDc2OS41OTkgMjg1LjU1Qzc3OS4zNzcgMjkwLjUzMSA3ODcuMTI2IDMwMy45OTkgODAyLjQzOCAzMzAuOTM1TDg3Ni40MiA0NjAuMDc5TDg3Ni43OTcgNDYwLjczOEM4OTMuMzM2IDQ4OS42MzUgOTAxLjcyMyA1MDQuMjg5IDkwNS4zODUgNTE5LjY2OUM5MDkuNDQzIDUzNi40NTggOTA5LjQ0MyA1NTQuMTY5IDkwNS4zODUgNTcwLjk1OEM5MDEuNjk1IDU4Ni40NTUgODkzLjM5MyA2MDEuMjE1IDg3Ni42MDQgNjMwLjU0OUw2ODcuNTczIDk2NC43MDJMNjg3LjA4NCA5NjUuNTU4QzY3MC40MzYgOTk0LjY5MyA2NjEuOTk5IDEwMDkuNDYgNjUwLjMwNiAxMDIwLjZDNjM3LjU3NiAxMDMyLjc4IDYyMi4yNjMgMTA0MS42MyA2MDUuNDc0IDEwNDYuNjJDNTkwLjE2MSAxMDUwLjg2IDU3My4wMDQgMTA1MC44NiA1MzguNjg4IDEwNTAuODZaTTkwNi43NSAxMDUwLjg2SDExMTUuNTlDMTE0Ni40IDEwNTAuODYgMTE2MS45IDEwNTAuODYgMTE3MS4xMyAxMDQ0Ljc4QzExODEuMDkgMTAzOC4zMiAxMTg3LjM2IDEwMjcuNDMgMTE4Ny45MiAxMDE1LjYzQzExODguNDUgMTAwNS4xIDExODEuMDUgOTkyLjMzIDExNjYuNTUgOTY3LjMwN0MxMTY2LjA1IDk2Ni40NTUgMTE2NS41NSA5NjUuNTg4IDExNjUuMDQgOTY0LjcwNkwxMDYwLjQzIDc4NS43NUwxMDU5LjI0IDc4My43MzVDMTA0NC41NCA3NTguODc3IDEwMzcuMTIgNzQ2LjMyNCAxMDI3LjU5IDc0MS40NzJDMTAxNy4wOCA3MzYuMTIxIDEwMDQuNzEgNzM2LjEyMSA5OTQuMTk5IDc0MS40NzJDOTg0LjYwNSA3NDYuNDUzIDk3Ni44NTcgNzU5LjU1MiA5NjEuNTQ0IDc4NS45MzRMODU3LjMwNiA5NjQuODkxTDg1Ni45NDkgOTY1LjUwN0M4NDEuNjkgOTkxLjg0NyA4MzQuMDY0IDEwMDUuMDEgODM0LjYxNCAxMDE1LjgxQzgzNS4zNTIgMTAyNy42MiA4NDEuNDQgMTAzOC41IDg1MS40MDIgMTA0NC45NkM4NjAuNDQzIDEwNTAuODYgODc1Ljk0IDEwNTAuODYgOTA2Ljc1IDEwNTAuODZaIiBmaWxsPSIjRTg0MTQyIi8+Cjwvc3ZnPgo=",
      name: "Wrapped AVAX",
      symbol: "WAVAX",
    },
    {
      address: "0x5425890298aed601595a70AB815c96711a31Bc65",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
  "43114": [
    {
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwMyIgaGVpZ2h0PSIxNTA0IiB2aWV3Qm94PSIwIDAgMTUwMyAxNTA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIyODciIHk9IjI1OCIgd2lkdGg9IjkyOCIgaGVpZ2h0PSI4NDQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUwMi41IDc1MkMxNTAyLjUgMTE2Ni43NyAxMTY2LjI3IDE1MDMgNzUxLjUgMTUwM0MzMzYuNzM0IDE1MDMgMC41IDExNjYuNzcgMC41IDc1MkMwLjUgMzM3LjIzNCAzMzYuNzM0IDEgNzUxLjUgMUMxMTY2LjI3IDEgMTUwMi41IDMzNy4yMzQgMTUwMi41IDc1MlpNNTM4LjY4OCAxMDUwLjg2SDM5Mi45NEMzNjIuMzE0IDEwNTAuODYgMzQ3LjE4NiAxMDUwLjg2IDMzNy45NjIgMTA0NC45NkMzMjcuOTk5IDEwMzguNSAzMjEuOTExIDEwMjcuOCAzMjEuMTczIDEwMTUuOTlDMzIwLjYxOSAxMDA1LjExIDMyOC4xODQgOTkxLjgyMiAzNDMuMzEyIDk2NS4yNTVMNzAzLjE4MiAzMzAuOTM1QzcxOC40OTUgMzAzLjk5OSA3MjYuMjQzIDI5MC41MzEgNzM2LjAyMSAyODUuNTVDNzQ2LjUzNyAyODAuMiA3NTkuMDgzIDI4MC4yIDc2OS41OTkgMjg1LjU1Qzc3OS4zNzcgMjkwLjUzMSA3ODcuMTI2IDMwMy45OTkgODAyLjQzOCAzMzAuOTM1TDg3Ni40MiA0NjAuMDc5TDg3Ni43OTcgNDYwLjczOEM4OTMuMzM2IDQ4OS42MzUgOTAxLjcyMyA1MDQuMjg5IDkwNS4zODUgNTE5LjY2OUM5MDkuNDQzIDUzNi40NTggOTA5LjQ0MyA1NTQuMTY5IDkwNS4zODUgNTcwLjk1OEM5MDEuNjk1IDU4Ni40NTUgODkzLjM5MyA2MDEuMjE1IDg3Ni42MDQgNjMwLjU0OUw2ODcuNTczIDk2NC43MDJMNjg3LjA4NCA5NjUuNTU4QzY3MC40MzYgOTk0LjY5MyA2NjEuOTk5IDEwMDkuNDYgNjUwLjMwNiAxMDIwLjZDNjM3LjU3NiAxMDMyLjc4IDYyMi4yNjMgMTA0MS42MyA2MDUuNDc0IDEwNDYuNjJDNTkwLjE2MSAxMDUwLjg2IDU3My4wMDQgMTA1MC44NiA1MzguNjg4IDEwNTAuODZaTTkwNi43NSAxMDUwLjg2SDExMTUuNTlDMTE0Ni40IDEwNTAuODYgMTE2MS45IDEwNTAuODYgMTE3MS4xMyAxMDQ0Ljc4QzExODEuMDkgMTAzOC4zMiAxMTg3LjM2IDEwMjcuNDMgMTE4Ny45MiAxMDE1LjYzQzExODguNDUgMTAwNS4xIDExODEuMDUgOTkyLjMzIDExNjYuNTUgOTY3LjMwN0MxMTY2LjA1IDk2Ni40NTUgMTE2NS41NSA5NjUuNTg4IDExNjUuMDQgOTY0LjcwNkwxMDYwLjQzIDc4NS43NUwxMDU5LjI0IDc4My43MzVDMTA0NC41NCA3NTguODc3IDEwMzcuMTIgNzQ2LjMyNCAxMDI3LjU5IDc0MS40NzJDMTAxNy4wOCA3MzYuMTIxIDEwMDQuNzEgNzM2LjEyMSA5OTQuMTk5IDc0MS40NzJDOTg0LjYwNSA3NDYuNDUzIDk3Ni44NTcgNzU5LjU1MiA5NjEuNTQ0IDc4NS45MzRMODU3LjMwNiA5NjQuODkxTDg1Ni45NDkgOTY1LjUwN0M4NDEuNjkgOTkxLjg0NyA4MzQuMDY0IDEwMDUuMDEgODM0LjYxNCAxMDE1LjgxQzgzNS4zNTIgMTAyNy42MiA4NDEuNDQgMTAzOC41IDg1MS40MDIgMTA0NC45NkM4NjAuNDQzIDEwNTAuODYgODc1Ljk0IDEwNTAuODYgOTA2Ljc1IDEwNTAuODZaIiBmaWxsPSIjRTg0MTQyIi8+Cjwvc3ZnPgo=",
      name: "Wrapped AVAX",
      symbol: "WAVAX",
    },
    {
      address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
      icon: tetherUsdIcon,
      name: "Tether USD",
      symbol: "USDT",
    },
    {
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
      icon: wrappedBtcIcon,
      name: "Wrapped BTC",
      symbol: "WBTC",
    },
  ],
  "80001": [
    {
      address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      icon: maticIcon,
      name: "Wrapped Matic",
      symbol: "WMATIC",
    },
    {
      address: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      address: "0x3813e82e6f7098b9583FC0F33a962D02018B6803",
      icon: tetherUsdIcon,
      name: "Tether USD",
      symbol: "USDT",
    },
  ],
  // Base sepolia
  "84532": [
    {
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
  "421613": [
    {
      address: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
      icon: wrappedEthIcon,
      name: "Wrapped Ether",
      symbol: "WETH",
    },
    {
      address: "0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
  "11155111": [
    {
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      icon: usdcIcon,
      name: "USD Coin",
      symbol: "USDC",
    },
  ],
} as const;

/**
 * Default tokens shown in [`ConnectButton`](https://portal.thirdweb.com/react/v4/components/ConnectButton)'s SendFunds screen for each network.
 *
 * You can use the default tokens as a starting point for your own list of tokens and override tokens for specific networks.
 * @example
 * Below example shows adding a custom token for the Ethereum mainnet at start of the list of default tokens for the Ethereum mainnet. Here the `1` represents the chainId of Ethereum mainnet.
 *
 * ```tsx
 * const ethereumChainId = 1;
 *
 * <ConnectButton supportedTokens={{
 *  ...defaultTokens,
 *  [ethereumChainId]: [
 *    {
 *      address: 'YOUR_TOKEN_ADDRESS',
 *      name: 'YOUR_TOKEN_NAME',
 *      symbol: 'YOUR_TOKEN_SYMBOL',
 *      icon: 'YOUR_TOKEN_ICON_URL'
 *    },
 *    ...defaultTokens[ethereumChainId],
 *  ]
 * }} />
 * ```
 */
export const defaultTokens = DEFAULT_TOKENS as unknown as SupportedTokens;

type SupportedSymbol =
  (typeof DEFAULT_TOKENS)[keyof typeof DEFAULT_TOKENS][number]["symbol"];

/**
 * Get the default token for a given chain and symbol
 * @param chain - The chain to get the token for
 * @param symbol - The symbol of the token to get
 * @returns The default token for the given chain and symbol
 * @example
 * ```ts
 * import { getDefaultToken } from "thirdweb/react";
 * import { ethereum } from "thirdweb/chains";
 *
 * const token = getDefaultToken(ethereum, "USDC");
 * ```
 * @utils
 */
export function getDefaultToken(chain: Chain, symbol: SupportedSymbol) {
  const tokens = defaultTokens[chain.id];
  return tokens?.find((t) => t.symbol === symbol);
}
