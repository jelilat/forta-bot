import {
  BlockEvent,
  Finding,
  HandleBlock,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";

export const BOT_DEPLOYMENT_EVENT =
  "event AgentUpdated(uint256 indexed agentId, address indexed by, string metadata, uint256[] chainIds)";
export const DEPLOYER_ADDRESS = "0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8";
export const FORTA_CONTRACT_ADDRESS = "0x61447385B019187daa48e91c55c02AF1F1f3F863";


const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];

  // filter the transaction logs for Bot deployment events
  const botDeploymentEvents = txEvent.filterLog(BOT_DEPLOYMENT_EVENT, DEPLOYER_ADDRESS);

  // for each bot deployment Event
  botDeploymentEvents.forEach((deployEvent) => {
      findings.push(
        Finding.from({
          name: "Deployment of Forta Agent",
          description: `Forta Agent deployed to ${FORTA_CONTRACT_ADDRESS}`,
          alertId: "FORTA-1",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata: {
            from: DEPLOYER_ADDRESS,
            to: FORTA_CONTRACT_ADDRESS
          }
        })
      );
  });

  return findings;
};

export default {
  handleTransaction
};
