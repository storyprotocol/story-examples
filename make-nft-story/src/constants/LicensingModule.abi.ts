const abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "accessController",
        type: "address",
        internalType: "address",
      },
      {
        name: "ipAccountRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "royaltyModule",
        type: "address",
        internalType: "address",
      },
      {
        name: "registry",
        type: "address",
        internalType: "address",
      },
      {
        name: "disputeModule",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ACCESS_CONTROLLER",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAccessController",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DISPUTE_MODULE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IDisputeModule",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "IP_ACCOUNT_REGISTRY",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IIPAccountRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "LICENSE_REGISTRY",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ILicenseRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ROYALTY_MODULE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract RoyaltyModule",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addPolicyToIp",
    inputs: [
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
      {
        name: "polId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "indexOnIpId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPolicyId",
    inputs: [
      {
        name: "pol",
        type: "tuple",
        internalType: "struct Licensing.Policy",
        components: [
          {
            name: "isLicenseTransferable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "policyFramework",
            type: "address",
            internalType: "address",
          },
          {
            name: "frameworkData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "royaltyPolicy",
            type: "address",
            internalType: "address",
          },
          {
            name: "royaltyData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "mintingFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintingFeeToken",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isFrameworkRegistered",
    inputs: [
      {
        name: "policyFramework",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isParent",
    inputs: [
      {
        name: "parentIpId",
        type: "address",
        internalType: "address",
      },
      {
        name: "childIpId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPolicyDefined",
    inputs: [
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPolicyIdSetForIp",
    inputs: [
      {
        name: "isInherited",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPolicyInherited",
    inputs: [
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "linkIpToParents",
    inputs: [
      {
        name: "licenseIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "childIpId",
        type: "address",
        internalType: "address",
      },
      {
        name: "royaltyContext",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintLicense",
    inputs: [
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "licensorIpId",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "royaltyContext",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "licenseId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "parentIpIds",
    inputs: [
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "policy",
    inputs: [
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "pol",
        type: "tuple",
        internalType: "struct Licensing.Policy",
        components: [
          {
            name: "isLicenseTransferable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "policyFramework",
            type: "address",
            internalType: "address",
          },
          {
            name: "frameworkData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "royaltyPolicy",
            type: "address",
            internalType: "address",
          },
          {
            name: "royaltyData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "mintingFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintingFeeToken",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "policyAggregatorData",
    inputs: [
      {
        name: "framework",
        type: "address",
        internalType: "address",
      },
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "policyForIpAtIndex",
    inputs: [
      {
        name: "isInherited",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Licensing.Policy",
        components: [
          {
            name: "isLicenseTransferable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "policyFramework",
            type: "address",
            internalType: "address",
          },
          {
            name: "frameworkData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "royaltyPolicy",
            type: "address",
            internalType: "address",
          },
          {
            name: "royaltyData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "mintingFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintingFeeToken",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "policyIdForIpAtIndex",
    inputs: [
      {
        name: "isInherited",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "policyIdsForIp",
    inputs: [
      {
        name: "isInherited",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "policyIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "policyStatus",
    inputs: [
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isInherited",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "active",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerPolicy",
    inputs: [
      {
        name: "pol",
        type: "tuple",
        internalType: "struct Licensing.Policy",
        components: [
          {
            name: "isLicenseTransferable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "policyFramework",
            type: "address",
            internalType: "address",
          },
          {
            name: "frameworkData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "royaltyPolicy",
            type: "address",
            internalType: "address",
          },
          {
            name: "royaltyData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "mintingFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "mintingFeeToken",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "policyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerPolicyFrameworkManager",
    inputs: [
      {
        name: "manager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalParentsForIpId",
    inputs: [
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalPolicies",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalPoliciesForIp",
    inputs: [
      {
        name: "isInherited",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "ipId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "IpIdLinkedToParents",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "ipId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "parentIpIds",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PolicyAddedToIpId",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "ipId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "policyId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "isInherited",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PolicyFrameworkRegistered",
    inputs: [
      {
        name: "framework",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "licenseTextUrl",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PolicyRegistered",
    inputs: [
      {
        name: "policyId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "policyFrameworkManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "frameworkData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "royaltyPolicy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "royaltyData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "mintingFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "mintingFeeToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AccessControlled__NotIpAccount",
    inputs: [
      {
        name: "ipAccount",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AccessControlled__ZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__CallerNotLicensorAndPolicyNotSet",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__DerivativesCannotAddPolicy",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__DisputedIpId",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__EmptyLicenseUrl",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__FrameworkNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__IncompatibleLicensorCommercialPolicy",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__InvalidPolicyFramework",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__LicensorNotRegistered",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__LinkParentParamFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__LinkingRevokedLicense",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__MintLicenseParamFailed",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__MintingFeeTokenNotWhitelisted",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__NotLicensee",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__ParentIdEqualThanChild",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__PolicyAlreadySetForIpId",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__PolicyNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__RegisterPolicyFrameworkMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "LicensingModule__RoyaltyPolicyNotWhitelisted",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
];

export default abi;
