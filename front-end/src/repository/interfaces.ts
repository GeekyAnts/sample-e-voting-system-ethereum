export interface Candidate {
  name: string;
  aadharNumber: string;
  partyShortcut: string;
  voteCount: string;
  partyFlag: string /* added now */;
  stateCode: string;
  constituencyCode: string;
}
export interface CastVoteResponse {
  msg: string;
  error: boolean;
}

export interface CheckVoteStatusResponse {
  canVote: boolean;
  votedCandidate?: Candidate;
  error: boolean;
}

// export  interface Ballot {
//     contractName:      string;
//     abi:               ABI[];
//     metadata:          string;
//     bytecode:          string;
//     deployedBytecode:  string;
//     sourceMap:         string;
//     deployedSourceMap: string;
//     source:            string;
//     sourcePath:        string;
//     ast:               AST;
//     legacyAST:         AST;
//     compiler:          Compiler;
//     networks:          Networks;
//     schemaVersion:     string;
//     updatedAt:         Date;
//     networkType:       string;
//     devdoc:            Devdoc;
//     userdoc:           Userdoc;
// }

// export interface ABI {
//     inputs:          Input[];
//     payable:         boolean;
//     stateMutability: StateMutability;
//     type:            KindEnum;
//     constant?:       boolean;
//     name?:           string;
//     outputs?:        Input[];
// }

// export interface Input {
//     components?:  Input[];
//     internalType: InternalType;
//     name:         string;
//     type:         InputType;
// }

// export enum InternalType {
//     Bool = "bool",
//     InternalTypeStructBallotCandidate = "struct Ballot.Candidate",
//     String = "string",
//     StructBallotCandidate = "struct Ballot.Candidate[]",
//     Uint256 = "uint256",
// }

// export enum InputType {
//     Bool = "bool",
//     String = "string",
//     Tuple = "tuple[]",
//     TypeTuple = "tuple",
//     Uint256 = "uint256",
// }

// export enum StateMutability {
//     Nonpayable = "nonpayable",
//     View = "view",
// }

// export enum KindEnum {
//     Constructor = "constructor",
//     Function = "function",
// }

// export interface AST {
//     absolutePath:    string;
//     exportedSymbols: ExportedSymbols;
//     id:              number;
//     nodeType:        string;
//     nodes:           ASTNode[];
//     src:             string;
// }

// export interface ExportedSymbols {
//     Ballot: number[];
// }

// export interface ASTNode {
//     id:                       number;
//     literals?:                string[];
//     nodeType:                 string;
//     src:                      string;
//     baseContracts?:           any[];
//     contractDependencies?:    any[];
//     contractKind?:            string;
//     documentation?:           string;
//     fullyImplemented?:        boolean;
//     linearizedBaseContracts?: number[];
//     name?:                    string;
//     nodes?:                   NodeNode[];
//     scope?:                   number;
// }

// export interface NodeNode {
//     canonicalName?:    string;
//     id:                number;
//     members?:          Member[];
//     name:              string;
//     nodeType:          DeclarationNodeType;
//     scope:             number;
//     src:               string;
//     visibility:        NodeVisibility;
//     constant?:         boolean;
//     stateVariable?:    boolean;
//     storageLocation?:  StorageLocation;
//     typeDescriptions?: TypeDescriptions;
//     typeName?:         TypeName;
//     value?:            null;
//     body?:             NodeBody;
//     documentation?:    string;
//     implemented?:      boolean;
//     kind?:             KindEnum;
//     modifiers?:        any[];
//     parameters?:       Parameters;
//     returnParameters?: ReturnParameters;
//     stateMutability?:  StateMutability;
//     superFunction?:    null;
// }

// export interface NodeBody {
//     id:         number;
//     nodeType:   BodyNodeType;
//     src:        string;
//     statements: PurpleStatement[];
// }

// export enum BodyNodeType {
//     Block = "Block",
//     Break = "Break",
//     ExpressionStatement = "ExpressionStatement",
//     ParameterList = "ParameterList",
// }

// export interface PurpleStatement {
//     body?:                     StatementBody;
//     condition?:                TentacledCondition;
//     id:                        number;
//     initializationExpression?: InitializationExpression;
//     loopExpression?:           LoopExpression;
//     nodeType:                  StatementNodeType;
//     src:                       string;
//     assignments?:              number[];
//     declarations?:             DeclarationElement[];
//     initialValue?:             PurpleInitialValue | null;
//     expression?:               ExpressionElement;
//     functionReturnParameters?: number;
// }

// export interface StatementBody {
//     id:         number;
//     nodeType:   BodyNodeType;
//     src:        string;
//     statements: FluffyStatement[];
// }

// export interface FluffyStatement {
//     assignments?:  number[];
//     declarations?: PurpleDeclaration[];
//     id:            number;
//     initialValue?: InitialValue;
//     nodeType:      StatementNodeType;
//     src:           string;
//     expression?:   FluffyExpression;
//     condition?:    PurpleCondition;
//     falseBody?:    null;
//     trueBody?:     TrueBody;
// }

// export interface PurpleCondition {
//     argumentTypes:    null;
//     commonType?:      TypeDescriptions;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     leftExpression?:  PurpleLeftExpression;
//     nodeType:         ConditionNodeType;
//     operator:         LeftExpressionOperator;
//     rightExpression?: RightExpression;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
//     prefix?:          boolean;
//     subExpression?:   LeftExpression;
// }

// export interface TypeDescriptions {
//     typeIdentifier: string;
//     typeString:     string;
// }

// export interface PurpleLeftExpression {
//     argumentTypes:          null;
//     commonType?:            TypeDescriptions;
//     id:                     number;
//     isConstant:             boolean;
//     isLValue:               boolean;
//     isPure:                 boolean;
//     lValueRequested:        boolean;
//     leftExpression?:        FluffyLeftExpression;
//     nodeType:               ConditionNodeType;
//     operator?:              LeftExpressionOperator;
//     rightExpression?:       LeftExpression;
//     src:                    string;
//     typeDescriptions:       TypeDescriptions;
//     expression?:            ExpressionElement;
//     memberName?:            string;
//     referencedDeclaration?: number;
// }

// export interface ExpressionElement {
//     argumentTypes:           TypeDescriptions[] | null;
//     baseExpression?:         BaseExpression;
//     id:                      number;
//     indexExpression?:        LeftExpression;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     nodeType:                ConditionNodeType;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     expression?:             PurpleExpression;
//     memberName?:             string;
//     referencedDeclaration?:  number | null;
//     hexValue?:               string;
//     kind?:                   Kind;
//     subdenomination?:        null;
//     value?:                  string;
//     name?:                   string;
//     overloadedDeclarations?: any[];
//     arguments?:              LeftExpressionArgument[];
//     names?:                  any[];
//     typeName?:               TypeName;
//     commonType?:             TypeDescriptions;
//     leftExpression?:         ExpressionElement;
//     operator?:               LeftExpressionOperator;
//     rightExpression?:        LeftExpression;
// }

// export interface LeftExpressionArgument {
//     argumentTypes:           null;
//     id:                      number;
//     name?:                   string;
//     nodeType:                ConditionNodeType;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     hexValue?:               string;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     kind?:                   string;
//     lValueRequested?:        boolean;
//     subdenomination?:        null;
//     value?:                  string;
//     operator?:               string;
//     prefix?:                 boolean;
//     subExpression?:          ArgumentSubExpression;
//     arguments?:              PurpleArgument[];
//     expression?:             LeftExpression;
//     names?:                  string[];
// }

// export interface PurpleArgument {
//     argumentTypes:           null;
//     id:                      number;
//     name?:                   string;
//     nodeType:                ConditionNodeType;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     hexValue?:               string;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     kind?:                   InternalType;
//     lValueRequested?:        boolean;
//     subdenomination?:        null;
//     value?:                  string;
// }

// export enum ConditionNodeType {
//     Assignment = "Assignment",
//     BinaryOperation = "BinaryOperation",
//     FunctionCall = "FunctionCall",
//     Identifier = "Identifier",
//     IndexAccess = "IndexAccess",
//     Literal = "Literal",
//     MemberAccess = "MemberAccess",
//     NewExpression = "NewExpression",
//     UnaryOperation = "UnaryOperation",
// }

// export interface LeftExpression {
//     argumentTypes?:          TypeDescriptions[] | null;
//     id:                      number;
//     name?:                   string;
//     nodeType:                IndexExpressionNodeType;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     contractScope?:          null;
//     baseType?:               LeftExpression;
//     length?:                 null;
// }

// export enum IndexExpressionNodeType {
//     ArrayTypeName = "ArrayTypeName",
//     ElementaryTypeName = "ElementaryTypeName",
//     Identifier = "Identifier",
//     UserDefinedTypeName = "UserDefinedTypeName",
// }

// export interface ArgumentSubExpression {
//     argumentTypes:    null;
//     arguments:        LeftExpression[];
//     expression:       LeftExpression;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     kind:             Kind;
//     lValueRequested:  boolean;
//     names:            any[];
//     nodeType:         ConditionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
// }

// export enum Kind {
//     Bool = "bool",
//     FunctionCall = "functionCall",
//     Number = "number",
//     StructConstructorCall = "structConstructorCall",
// }

// export interface BaseExpression {
//     argumentTypes:          null;
//     id:                     number;
//     name:                   BaseExpressionName;
//     nodeType:               IndexExpressionNodeType;
//     overloadedDeclarations: any[];
//     referencedDeclaration:  number;
//     src:                    string;
//     typeDescriptions:       TypeDescriptions;
// }

// export enum BaseExpressionName {
//     Candidates = "candidates",
//     Cc = "cc",
//     NameCandidates = "candidates_",
//     Require = "require",
//     VotersList = "votersList",
// }

// export interface PurpleExpression {
//     argumentTypes:           TypeDescriptions[] | null;
//     baseExpression?:         BaseExpression;
//     id:                      number;
//     indexExpression?:        LeftExpression;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     nodeType:                ConditionNodeType;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     name?:                   BaseExpressionName;
//     overloadedDeclarations?: number[];
//     referencedDeclaration?:  number | null;
//     expression?:             LeftExpression;
//     memberName?:             MemberName;
// }

// export enum MemberName {
//     Length = "length",
//     Push = "push",
// }

// export enum LeftExpressionOperator {
//     Empty = "&&",
//     Fluffy = "++",
//     Operator = "==",
//     Purple = ">",
//     Tentacled = "<",
// }

// export interface TypeName {
//     baseType?:               BaseType;
//     id:                      number;
//     length?:                 null;
//     nodeType:                IndexExpressionNodeType;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     name?:                   BaseTypeName;
//     contractScope?:          null;
//     referencedDeclaration?:  number;
//     argumentTypes?:          null;
//     overloadedDeclarations?: any[];
// }

// export interface BaseType {
//     contractScope:         null;
//     id:                    number;
//     name:                  BaseTypeName;
//     nodeType:              IndexExpressionNodeType;
//     referencedDeclaration: number;
//     src:                   string;
//     typeDescriptions:      TypeDescriptions;
// }

// export enum BaseTypeName {
//     Bool = "bool",
//     Candidate = "Candidate",
//     Candidates = "candidates",
//     Uint256 = "uint256",
//     Voter = "Voter",
// }

// export interface FluffyLeftExpression {
//     argumentTypes:         null;
//     expression:            LeftHandSide;
//     id:                    number;
//     isConstant:            boolean;
//     isLValue:              boolean;
//     isPure:                boolean;
//     lValueRequested:       boolean;
//     memberName:            string;
//     nodeType:              ConditionNodeType;
//     referencedDeclaration: number;
//     src:                   string;
//     typeDescriptions:      TypeDescriptions;
// }

// export interface LeftHandSide {
//     argumentTypes:    null;
//     baseExpression:   LeftExpression;
//     id:               number;
//     indexExpression:  LeftExpression;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     nodeType:         ConditionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
// }

// export interface RightExpression {
//     argumentTypes:           null;
//     expression?:             LeftHandSide;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     memberName?:             string;
//     nodeType:                ConditionNodeType;
//     referencedDeclaration:   number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     name?:                   string;
//     overloadedDeclarations?: any[];
// }

// export interface PurpleDeclaration {
//     constant:         boolean;
//     id:               number;
//     name:             string;
//     nodeType:         DeclarationNodeType;
//     scope:            number;
//     src:              string;
//     stateVariable:    boolean;
//     storageLocation:  StorageLocation;
//     typeDescriptions: TypeDescriptions;
//     typeName:         LeftExpression;
//     value:            null;
//     visibility:       DeclarationVisibility;
// }

// export enum DeclarationNodeType {
//     FunctionDefinition = "FunctionDefinition",
//     StructDefinition = "StructDefinition",
//     VariableDeclaration = "VariableDeclaration",
// }

// export enum StorageLocation {
//     Default = "default",
//     Memory = "memory",
// }

// export enum DeclarationVisibility {
//     Internal = "internal",
// }

// export interface FluffyExpression {
//     argumentTypes:    null;
//     arguments?:       LeftExpression[];
//     expression?:      RightExpressionElement;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     kind?:            Kind;
//     lValueRequested:  boolean;
//     names?:           any[];
//     nodeType:         ConditionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
//     leftHandSide?:    LeftHandSide;
//     operator?:        PurpleOperator;
//     rightHandSide?:   PurpleRightHandSide;
// }

// export interface RightExpressionElement {
//     argumentTypes:         TypeDescriptions[] | null;
//     expression:            LeftExpression;
//     id:                    number;
//     isConstant:            boolean;
//     isLValue:              boolean;
//     isPure:                boolean;
//     lValueRequested:       boolean;
//     memberName:            MemberName;
//     nodeType:              ConditionNodeType;
//     referencedDeclaration: null;
//     src:                   string;
//     typeDescriptions:      TypeDescriptions;
// }

// export enum PurpleOperator {
//     Empty = "=",
//     Operator = "++",
// }

// export interface PurpleRightHandSide {
//     argumentTypes:    null;
//     arguments:        ExpressionElement[];
//     expression:       LeftExpression;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     kind:             Kind;
//     lValueRequested:  boolean;
//     names:            string[];
//     nodeType:         ConditionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
// }

// export interface InitialValue {
//     argumentTypes:           TypeDescriptions[] | null;
//     arguments?:              InitialValueArgument[];
//     expression?:             TentacledExpression;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     kind?:                   Kind;
//     lValueRequested?:        boolean;
//     names?:                  string[];
//     nodeType:                ConditionNodeType;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     hexValue?:               string;
//     subdenomination?:        null;
//     value?:                  string;
//     memberName?:             string;
//     referencedDeclaration?:  number | null;
//     name?:                   string;
//     overloadedDeclarations?: number[];
//     typeName?:               TypeName;
//     operator?:               LeftExpressionOperator;
//     prefix?:                 boolean;
//     subExpression?:          LeftExpression;
// }

// export interface InitialValueArgument {
//     argumentTypes:           null;
//     expression?:             LeftHandSideClass;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     memberName?:             string;
//     nodeType:                ConditionNodeType;
//     referencedDeclaration?:  number | null;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     hexValue?:               string;
//     kind?:                   Kind;
//     subdenomination?:        null;
//     value?:                  string;
//     name?:                   string;
//     overloadedDeclarations?: any[];
// }

// export interface LeftHandSideClass {
//     argumentTypes:           TypeDescriptions[] | null;
//     baseExpression?:         LeftExpression;
//     id:                      number;
//     indexExpression?:        LeftExpression;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     nodeType:                ConditionNodeType;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     name?:                   string;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
// }

// export interface TentacledExpression {
//     argumentTypes:           TypeDescriptions[] | null;
//     id:                      number;
//     name?:                   string;
//     nodeType:                ConditionNodeType;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     baseExpression?:         LeftExpression;
//     indexExpression?:        LeftExpression;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     typeName?:               TypeName;
// }

// export enum StatementNodeType {
//     Break = "Break",
//     ExpressionStatement = "ExpressionStatement",
//     ForStatement = "ForStatement",
//     IfStatement = "IfStatement",
//     Return = "Return",
//     VariableDeclarationStatement = "VariableDeclarationStatement",
// }

// export interface TrueBodyStatement {
//     expression?:               StickyExpression;
//     id:                        number;
//     nodeType:                  StatementNodeType;
//     src:                       string;
//     body?:                     TrueBody;
//     condition?:                FluffyCondition;
//     initializationExpression?: InitializationExpression;
//     loopExpression?:           TrueBody;
//     assignments?:              number[];
//     declarations?:             FluffyDeclaration[];
//     initialValue?:             InitialValue | null;
//     functionReturnParameters?: number;
//     falseBody?:                null;
//     trueBody?:                 TrueBody;
// }

// export interface TrueBody {
//     id:          number;
//     nodeType:    BodyNodeType;
//     src:         string;
//     statements?: TrueBodyStatement[];
//     expression?: TrueBodyExpression;
//     parameters?: TrueBodyParameter[];
// }

// export interface FluffyCondition {
//     argumentTypes:    null;
//     commonType:       TypeDescriptions;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     leftExpression:   TentacledLeftExpression;
//     nodeType:         ConditionNodeType;
//     operator:         LeftExpressionOperator;
//     rightExpression:  ExpressionElement;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
// }

// export interface TentacledLeftExpression {
//     argumentTypes:           null;
//     id:                      number;
//     name?:                   string;
//     nodeType:                ConditionNodeType;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     commonType?:             TypeDescriptions;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     leftExpression?:         ExpressionElement;
//     operator?:               LeftExpressionOperator;
//     rightExpression?:        LeftExpression;
//     expression?:             ExpressionElement;
//     memberName?:             string;
// }

// export interface FluffyDeclaration {
//     constant:         boolean;
//     id:               number;
//     name:             string;
//     nodeType:         DeclarationNodeType;
//     scope:            number;
//     src:              string;
//     stateVariable:    boolean;
//     storageLocation:  StorageLocation;
//     typeDescriptions: TypeDescriptions;
//     typeName:         FluffyTypeName;
//     value:            null;
//     visibility:       DeclarationVisibility;
// }

// export interface FluffyTypeName {
//     baseType?:              TypeName;
//     id:                     number;
//     length?:                null;
//     nodeType:               IndexExpressionNodeType;
//     src:                    string;
//     typeDescriptions:       TypeDescriptions;
//     name?:                  BaseTypeName;
//     contractScope?:         null;
//     referencedDeclaration?: number;
// }

// export interface StickyExpression {
//     argumentTypes:           null;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     leftHandSide?:           LeftHandSideClass;
//     nodeType:                ConditionNodeType;
//     operator?:               PurpleOperator;
//     rightHandSide?:          TentacledRightHandSide;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     prefix?:                 boolean;
//     subExpression?:          ExpressionElement;
//     name?:                   BaseExpressionName;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     arguments?:              FluffyArgument[];
//     expression?:             IndigoExpression;
//     kind?:                   Kind;
//     names?:                  any[];
// }

// export interface FluffyArgument {
//     argumentTypes:           null;
//     id:                      number;
//     name?:                   string;
//     nodeType:                ConditionNodeType;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     hexValue?:               string;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     kind?:                   string;
//     lValueRequested?:        boolean;
//     subdenomination?:        null;
//     value?:                  string;
//     operator?:               string;
//     prefix?:                 boolean;
//     subExpression?:          InitialValue;
//     arguments?:              InitialValue[];
//     expression?:             LeftExpression;
//     names?:                  string[];
// }

// export interface IndigoExpression {
//     argumentTypes:           TypeDescriptions[];
//     id:                      number;
//     name?:                   BaseExpressionName;
//     nodeType:                ConditionNodeType;
//     overloadedDeclarations?: number[];
//     referencedDeclaration:   number | null;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     expression?:             LeftExpression;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     memberName?:             MemberName;
// }

// export interface TentacledRightHandSide {
//     argumentTypes:           null;
//     hexValue?:               string;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     kind?:                   Kind;
//     lValueRequested?:        boolean;
//     nodeType:                ConditionNodeType;
//     src:                     string;
//     subdenomination?:        null;
//     typeDescriptions:        TypeDescriptions;
//     value?:                  string;
//     name?:                   string;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     arguments?:              RightHandSideArgument[];
//     expression?:             LeftHandSideClass;
//     names?:                  string[];
//     memberName?:             string;
//     baseExpression?:         LeftExpression;
//     indexExpression?:        LeftExpression;
// }

// export interface RightHandSideArgument {
//     argumentTypes:          null;
//     expression?:            LeftHandSide;
//     id:                     number;
//     isConstant:             boolean;
//     isLValue:               boolean;
//     isPure:                 boolean;
//     lValueRequested:        boolean;
//     memberName?:            string;
//     nodeType:               ConditionNodeType;
//     referencedDeclaration?: number;
//     src:                    string;
//     typeDescriptions:       TypeDescriptions;
//     hexValue?:              string;
//     kind?:                  Kind;
//     subdenomination?:       null;
//     value?:                 string;
// }

// export interface InitializationExpression {
//     assignments:  number[];
//     declarations: Member[];
//     id:           number;
//     initialValue: InitialValue;
//     nodeType:     StatementNodeType;
//     src:          string;
// }

// export interface Member {
//     constant:         boolean;
//     id:               number;
//     name:             string;
//     nodeType:         DeclarationNodeType;
//     scope:            number;
//     src:              string;
//     stateVariable:    boolean;
//     storageLocation:  StorageLocation;
//     typeDescriptions: TypeDescriptions;
//     typeName:         MemberTypeName;
//     value:            null;
//     visibility:       DeclarationVisibility;
// }

// export interface MemberTypeName {
//     id:               number;
//     name:             InternalType;
//     nodeType:         IndexExpressionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
// }

// export interface TrueBodyExpression {
//     argumentTypes:    null;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     leftHandSide?:    LeftExpression;
//     nodeType:         ConditionNodeType;
//     operator:         PurpleOperator;
//     rightHandSide?:   FluffyRightHandSide;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
//     prefix?:          boolean;
//     subExpression?:   ExpressionSubExpression;
// }

// export interface FluffyRightHandSide {
//     argumentTypes:           null;
//     hexValue?:               string;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     kind?:                   Kind;
//     lValueRequested?:        boolean;
//     nodeType:                ConditionNodeType;
//     src:                     string;
//     subdenomination?:        null;
//     typeDescriptions:        TypeDescriptions;
//     value?:                  string;
//     name?:                   string;
//     overloadedDeclarations?: any[];
//     referencedDeclaration?:  number;
//     arguments?:              RightHandSideArgument[];
//     expression?:             ExpressionElement;
//     names?:                  string[];
//     memberName?:             string;
//     baseExpression?:         LeftExpression;
//     indexExpression?:        LeftExpression;
// }

// export interface ExpressionSubExpression {
//     argumentTypes:           null;
//     expression?:             ExpressionElement;
//     id:                      number;
//     isConstant?:             boolean;
//     isLValue?:               boolean;
//     isPure?:                 boolean;
//     lValueRequested?:        boolean;
//     memberName?:             string;
//     nodeType:                ConditionNodeType;
//     referencedDeclaration:   number;
//     src:                     string;
//     typeDescriptions:        TypeDescriptions;
//     name?:                   string;
//     overloadedDeclarations?: any[];
// }

// export interface TrueBodyParameter {
//     constant:         boolean;
//     id:               number;
//     name:             string;
//     nodeType:         DeclarationNodeType;
//     scope:            number;
//     src:              string;
//     stateVariable:    boolean;
//     storageLocation:  StorageLocation;
//     typeDescriptions: TypeDescriptions;
//     typeName:         PurpleTypeName;
//     value:            null;
//     visibility:       DeclarationVisibility;
// }

// export interface PurpleTypeName {
//     baseType?:              BaseType;
//     id:                     number;
//     length?:                null;
//     nodeType:               IndexExpressionNodeType;
//     src:                    string;
//     typeDescriptions:       TypeDescriptions;
//     name?:                  BaseTypeName;
//     contractScope?:         null;
//     referencedDeclaration?: number;
// }

// export interface TentacledCondition {
//     argumentTypes:    null;
//     commonType:       TypeDescriptions;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     leftExpression:   LeftExpression;
//     nodeType:         ConditionNodeType;
//     operator:         LeftExpressionOperator;
//     rightExpression:  RightExpressionElement;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
// }

// export interface DeclarationElement {
//     constant:         boolean;
//     id:               number;
//     name:             string;
//     nodeType:         DeclarationNodeType;
//     scope:            number;
//     src:              string;
//     stateVariable:    boolean;
//     storageLocation:  StorageLocation;
//     typeDescriptions: TypeDescriptions;
//     typeName:         TypeName;
//     value:            null;
//     visibility:       DeclarationVisibility;
// }

// export interface PurpleInitialValue {
//     argumentTypes:    null;
//     arguments?:       RightExpressionElement[];
//     expression?:      IndecentExpression;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     kind:             Kind;
//     lValueRequested:  boolean;
//     names?:           any[];
//     nodeType:         ConditionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
//     hexValue?:        string;
//     subdenomination?: null;
//     value?:           string;
// }

// export interface IndecentExpression {
//     argumentTypes:    TypeDescriptions[];
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     nodeType:         ConditionNodeType;
//     src:              string;
//     typeDescriptions: TypeDescriptions;
//     typeName:         TypeName;
// }

// export interface LoopExpression {
//     expression: HilariousExpression;
//     id:         number;
//     nodeType:   BodyNodeType;
//     src:        string;
// }

// export interface HilariousExpression {
//     argumentTypes:    null;
//     id:               number;
//     isConstant:       boolean;
//     isLValue:         boolean;
//     isPure:           boolean;
//     lValueRequested:  boolean;
//     nodeType:         ConditionNodeType;
//     operator:         LeftExpressionOperator;
//     prefix:           boolean;
//     src:              string;
//     subExpression:    LeftExpression;
//     typeDescriptions: TypeDescriptions;
// }

// export interface Parameters {
//     id:         number;
//     nodeType:   BodyNodeType;
//     parameters: DeclarationElement[];
//     src:        string;
// }

// export interface ReturnParameters {
//     id:         number;
//     nodeType:   BodyNodeType;
//     parameters: TrueBodyParameter[];
//     src:        string;
// }

// export enum NodeVisibility {
//     Public = "public",
// }

// export interface Compiler {
//     name:    string;
//     version: string;
// }

// export interface Devdoc {
//     details: string;
//     methods: DevdocMethods;
//     title:   string;
// }

// export interface DevdocMethods {
//     constructor:                     Constructor;
//     "didCurrentVoterVoted(uint256)": Uint256;
//     "getCandidateList()":            GetCandidateList;
//     "getMyVoteCast(uint256)":        Uint256;
//     "vote(uint256,uint256)":         VoteUint256Uint256;
//     "winningCandidate()":            GetCandidateList;
// }

// export interface Constructor {
//     details: string;
//     params:  ConstructorParams;
// }

// export interface ConstructorParams {
//     candidates_: string;
// }

// export interface Uint256 {
//     details: string;
//     params:  DidCurrentVoterVotedUint256Params;
//     return:  string;
// }

// export interface DidCurrentVoterVotedUint256Params {
//     voterAadharNumber: string;
// }

// export interface GetCandidateList {
//     details: string;
//     return:  string;
// }

// export interface VoteUint256Uint256 {
//     details: string;
//     params:  VoteUint256Uint256Params;
// }

// export interface VoteUint256Uint256Params {
//     candidateAadharNumber: string;
//     voterAadharNumber:     string;
// }

// export interface Networks {
//     "5777": The5777;
// }

// export interface The5777 {
//     events:          EventsClass;
//     links:           EventsClass;
//     address:         string;
//     transactionHash: string;
// }

// export interface EventsClass {
// }

// export interface Userdoc {
//     methods: EventsClass;
// }
