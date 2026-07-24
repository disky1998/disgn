import React, { useState } from 'react';
import { Shield, Lock, FileCode, Cpu, Check, Copy, Key, GitBranch, Layers, ArrowUpRight } from 'lucide-react';

export const ProtocolSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SMART_CONTRACT' | 'ENCRYPTION' | 'NEURAL_API'>('SMART_CONTRACT');
  const [copiedCode, setCopiedCode] = useState(false);

  const smartContractCode = `// SPDX-License-Identifier: MCP-2099-NEURAL
pragma mcp ^2099.4.0;

import "@mcp/neural-core/contracts/QuantumToken.sol";
import "@mcp/security/ZkProofVerifier.sol";

contract MCP2099NeuralConsensus is ZkProofVerifier {
    struct NeuralNode {
        address nodeAddress;
        uint256 synapticCapacity; // FLOPS
        bool isQuantumEncrypted;
        uint256 reputationScore;
    }

    mapping(address => NeuralNode) public activeNodes;
    event SynapseTriggered(address indexed node, uint256 timestamp, bytes32 proofHash);

    function executeNeuralPayload(
        bytes32 payloadHash,
        bytes memory zkProof
    ) external returns (bool success) {
        require(verifyProof(payloadHash, zkProof), "MCP_ERR: ZK_INVALID");
        
        NeuralNode storage node = activeNodes[msg.sender];
        node.reputationScore += 10;
        
        emit SynapseTriggered(msg.sender, block.timestamp, payloadHash);
        return true;
    }
}`;

  const encryptionSpecCode = `// MCP-2099 Quantum Encryption Handshake
const handshake = await MCP2099Protocol.initiateHandshake({
  cipherSuite: "KYBER_1024_NEURAL",
  entropySource: "QUANTUM_SIMULATOR_0x99",
  zkProofRequirement: true,
});

console.log("Session Established:", handshake.sessionId);
// > SESSION_ID: 0x99A_2099_NEURAL_LINK_READY`;

  const neuralApiCode = `// MCP-2099 Neural Inference Execution API
import { NeuralClient } from '@mcp-2099/sdk';

const client = new NeuralClient({
  endpoint: 'wss://neural.mcp2099.io/v4',
  apiKey: process.env.MCP_2099_NEURAL_KEY
});

// Run 3D Simplex vector inference
const result = await client.predictVector({
  tensorShape: [1024, 768],
  precision: 'FP16_QUANTUM',
  repulsionPhysics: true
});`;

  const handleCopyCode = () => {
    let code = smartContractCode;
    if (activeTab === 'ENCRYPTION') code = encryptionSpecCode;
    if (activeTab === 'NEURAL_API') code = neuralApiCode;

    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto cyber-grid">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#00f3ff] mb-1">
            <Shield className="w-4 h-4 text-[#ff4d00]" />
            <span>PROTOCOL SPECIFICATIONS // 协议规格标准</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tight text-white glow-cyan">
            MCP_PROTOCOL (2099标准)
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
          规格版本: <span className="text-[#00f3ff] font-bold">v2099.4-FINAL</span>
        </div>
      </div>

      {/* Overview Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1 */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-[#00f3ff] mb-4 group-hover:scale-110 transition-transform">
            <FileCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2 flex items-center justify-between">
            <span>神经智能合约</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#00f3ff]" />
          </h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            支持基于零知识证明 (ZK-SNARKs) 的量子智能合约，确保 3D 神经网络计算结果不泄露原始敏感向量数据。
          </p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/40 flex items-center justify-center text-[#ff4d00] mb-4 group-hover:scale-110 transition-transform">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2 flex items-center justify-between">
            <span>同态量子加密</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#ff4d00]" />
          </h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Kyber-1024 抗量子后加密密钥握手协议，防止未来量子计算机对通信信道进行中间人逆向解密。
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-mono text-white mb-2 flex items-center justify-between">
            <span>3D 大脑 Vector API</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
          </h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            高并发 WebGL/WebGPU 特征计算接口，支持与 Three.js 和 custom GLSL 着色器平滑数据双向管道对接。
          </p>
        </div>

      </div>

      {/* Code Specification Playground */}
      <div className="glass-panel rounded-2xl border border-cyan-500/40 overflow-hidden">
        
        {/* Playground Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between p-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('SMART_CONTRACT')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'SMART_CONTRACT'
                  ? 'bg-cyan-500/20 text-[#00f3ff] border border-cyan-500/50 shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SmartContract.sol
            </button>

            <button
              onClick={() => setActiveTab('ENCRYPTION')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'ENCRYPTION'
                  ? 'bg-orange-500/20 text-[#ff4d00] border border-orange-500/50 shadow-[0_0_10px_rgba(255,77,0,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              QuantumEncryption.ts
            </button>

            <button
              onClick={() => setActiveTab('NEURAL_API')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'NEURAL_API'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              NeuralAPI.ts
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg glass-panel border border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-white flex items-center space-x-1.5"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? '已复制代码' : '复制规范'}</span>
          </button>
        </div>

        {/* Code Content Block */}
        <div className="p-6 overflow-x-auto bg-slate-950 font-mono text-xs md:text-sm text-slate-200 leading-relaxed selection:bg-[#00f3ff] selection:text-black">
          <pre>
            <code>
              {activeTab === 'SMART_CONTRACT' && smartContractCode}
              {activeTab === 'ENCRYPTION' && encryptionSpecCode}
              {activeTab === 'NEURAL_API' && neuralApiCode}
            </code>
          </pre>
        </div>

      </div>

    </section>
  );
};
