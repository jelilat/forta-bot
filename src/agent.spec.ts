import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
  ethers,
} from "forta-agent";
import agent, {
  BOT_DEPLOYMENT_EVENT,
  DEPLOYER_ADDRESS,
  FORTA_CONTRACT_ADDRESS,
} from "./agent";

describe("Nethermind deployed a Forta agent", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);

  beforeAll(() => {
    handleTransaction = agent.handleTransaction;
  });

  describe("handleTransaction", () => {
    it("returns empty findings if there are no Forta agent deployments", async () => {
      mockTxEvent.filterLog = jest.fn().mockReturnValue([]);

      const findings = await handleTransaction(mockTxEvent);

      expect(findings).toStrictEqual([]);
    });

    it("returns a finding if a Forta agent has been deployed", async () => {
      const mockTetherDeploymentEvent = {
        args: {
          agentId: "85833389299281977326169868148634497765380089334344114319688312380853379831214",
          by: DEPLOYER_ADDRESS,
          metadata: "QmVAtFtURYag7pZS7oLT5G7SfXeKpgVP8ZGNHVu7VtZLPr",
          chainIds: [137]
        },
      };
      mockTxEvent.filterLog = jest
        .fn()
        .mockReturnValue([mockTetherDeploymentEvent]);

      const findings = await handleTransaction(mockTxEvent);
      console.log(findings)
      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "Deployment of Forta Agent",
          description: `Forta Agent deployed to ${FORTA_CONTRACT_ADDRESS}`,
          alertId: "FORTA-1",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            from: mockTetherDeploymentEvent.args.by,
            to: FORTA_CONTRACT_ADDRESS
          },
        }),
      ]);
    });
  });
});
